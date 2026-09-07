#!/usr/bin/env python3
"""
Build assets/docs/resume.pdf from the CV facts below.

Why this exists: cv.txt is LaTeX, and no TeX distribution is installed on the
machine this site is maintained from. Rather than hand-editing a binary PDF
(which is how the previous one ended up with overlapping text and a mangled
number), this writes a correct PDF directly using the base-14 fonts, so no
font embedding is needed and the output is a few kilobytes.

Every line is positioned absolutely with its own BT/Td/ET block, so a layout
mistake can never cascade into the rest of the page.

Regenerate after editing:  python3 tools/build_resume_pdf.py
"""

import os
import zlib

# --------------------------------------------------------------------- fonts --

_HELV = (
    "278 278 355 556 556 889 667 191 333 333 389 584 278 333 278 278 "
    "556 556 556 556 556 556 556 556 556 556 278 278 584 584 584 556 "
    "1015 667 667 722 722 667 611 778 722 278 500 667 556 833 722 778 "
    "667 778 722 667 611 722 667 944 667 667 611 278 278 278 469 556 "
    "333 556 556 500 556 556 278 556 556 222 222 500 222 833 556 556 "
    "556 556 333 500 278 556 500 722 500 500 500 334 260 334 584"
)

_HELV_BOLD = (
    "278 333 474 556 556 889 722 238 333 333 389 584 278 333 278 278 "
    "556 556 556 556 556 556 556 556 556 556 333 333 584 584 584 611 "
    "975 722 722 722 722 667 611 778 722 278 556 722 611 833 722 778 "
    "667 778 722 667 611 722 667 944 667 667 611 333 278 333 584 556 "
    "333 556 611 556 611 556 333 611 611 278 278 556 278 889 611 611 "
    "611 611 389 556 333 611 556 778 556 556 500 389 280 389 584"
)

WIDTHS = {
    "regular": [int(w) for w in _HELV.split()],
    "bold": [int(w) for w in _HELV_BOLD.split()],
}


def text_width(text, font, size):
    table = WIDTHS[font]
    total = 0
    for ch in text:
        code = ord(ch)
        total += table[code - 32] if 32 <= code <= 126 else 556
    return total * size / 1000.0


def wrap(text, font, size, max_width):
    words, lines, current = text.split(), [], ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if text_width(candidate, font, size) <= max_width or not current:
            current = candidate
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


# ---------------------------------------------------------------- pdf writer --

PAGE_W, PAGE_H = 595.28, 841.89
MARGIN_X, MARGIN_TOP, MARGIN_BOTTOM = 46.0, 46.0, 52.0
CONTENT_W = PAGE_W - 2 * MARGIN_X

INK = "0 0 0"
MUTED = "0.32 0.32 0.32"
RULE = "0.6 0.6 0.6"


def esc(text):
    return text.replace("\\", r"\\").replace("(", r"\(").replace(")", r"\)")


class Pdf:
    def __init__(self):
        self.pages = []
        self.ops = []
        self.y = PAGE_H - MARGIN_TOP

    # -- page handling --------------------------------------------------------

    def new_page(self):
        if self.ops:
            self.pages.append("\n".join(self.ops))
        self.ops = []
        self.y = PAGE_H - MARGIN_TOP

    def ensure(self, needed):
        if self.y - needed < MARGIN_BOTTOM:
            self.new_page()

    def finish(self):
        if self.ops:
            self.pages.append("\n".join(self.ops))
            self.ops = []

    # -- drawing primitives ---------------------------------------------------

    def text(self, content, x, y, size, font="regular", color=INK):
        res = "/F2" if font == "bold" else "/F1"
        self.ops.append(
            f"BT {color} rg {res} {size:.2f} Tf 1 0 0 1 {x:.2f} {y:.2f} Tm "
            f"({esc(content)}) Tj ET"
        )

    def rule(self, y, x0=MARGIN_X, x1=PAGE_W - MARGIN_X, color=RULE, width=0.6):
        self.ops.append(
            f"{color} RG {width} w {x0:.2f} {y:.2f} m {x1:.2f} {y:.2f} l S"
        )

    # -- content blocks -------------------------------------------------------

    def heading(self, label):
        self.ensure(46)
        self.y -= 12
        self.text(label.upper(), MARGIN_X, self.y, 10.5, "bold")
        self.y -= 5
        self.rule(self.y)
        self.y -= 13

    def role(self, title, right, org=None):
        self.ensure(38)
        self.text(title, MARGIN_X, self.y, 10, "bold")
        if right:
            w = text_width(right, "regular", 8.8)
            self.text(right, PAGE_W - MARGIN_X - w, self.y, 8.8, "regular", MUTED)
        self.y -= 12
        if org:
            self.text(org, MARGIN_X, self.y, 9, "regular", MUTED)
            self.y -= 12

    def bullets(self, items, size=9, indent=12.0, leading=11.6):
        for item in items:
            lines = wrap(item, "regular", size, CONTENT_W - indent - 8)
            self.ensure(len(lines) * leading + 2)
            for i, line in enumerate(lines):
                if i == 0:
                    self.text("-", MARGIN_X + 2, self.y, size, "regular", MUTED)
                self.text(line, MARGIN_X + indent, self.y, size, "regular")
                self.y -= leading
        self.y -= 3

    def paragraph(self, body, size=9, leading=11.8, color=INK):
        for line in wrap(body, "regular", size, CONTENT_W):
            self.ensure(leading)
            self.text(line, MARGIN_X, self.y, size, "regular", color)
            self.y -= leading
        self.y -= 3

    def labelled(self, label, value, label_w=118.0, size=9, leading=11.6):
        lines = wrap(value, "regular", size, CONTENT_W - label_w)
        self.ensure(len(lines) * leading + 2)
        self.text(label, MARGIN_X, self.y, size, "bold")
        for line in lines:
            self.text(line, MARGIN_X + label_w, self.y, size, "regular")
            self.y -= leading
        self.y -= 2

    # -- serialisation --------------------------------------------------------

    def build(self):
        self.finish()

        objects = []          # 1-indexed on output
        page_ids = []
        n_pages = len(self.pages)

        # 1 catalog, 2 pages tree, 3 font F1, 4 font F2, then per page: page + content
        objects.append("<< /Type /Catalog /Pages 2 0 R >>")

        first_page_obj = 5
        for i in range(n_pages):
            page_ids.append(first_page_obj + i * 2)

        kids = " ".join(f"{pid} 0 R" for pid in page_ids)
        objects.append(f"<< /Type /Pages /Count {n_pages} /Kids [{kids}] >>")
        objects.append(
            "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica "
            "/Encoding /WinAnsiEncoding >>"
        )
        objects.append(
            "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold "
            "/Encoding /WinAnsiEncoding >>"
        )

        streams = {}
        for i, content in enumerate(self.pages):
            page_obj = first_page_obj + i * 2
            content_obj = page_obj + 1
            objects.append(
                f"<< /Type /Page /Parent 2 0 R "
                f"/MediaBox [0 0 {PAGE_W:.2f} {PAGE_H:.2f}] "
                f"/Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> "
                f"/Contents {content_obj} 0 R >>"
            )
            data = zlib.compress(content.encode("latin-1"))
            objects.append(None)          # placeholder, filled from streams
            streams[len(objects)] = data  # 1-indexed object number

        out = bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
        offsets = []

        for idx, body in enumerate(objects, start=1):
            offsets.append(len(out))
            out += f"{idx} 0 obj\n".encode("latin-1")
            if body is None:
                data = streams[idx]
                out += f"<< /Length {len(data)} /Filter /FlateDecode >>\nstream\n".encode("latin-1")
                out += data
                out += b"\nendstream\n"
            else:
                out += body.encode("latin-1") + b"\n"
            out += b"endobj\n"

        xref_at = len(out)
        count = len(objects) + 1
        out += f"xref\n0 {count}\n".encode("latin-1")
        out += b"0000000000 65535 f \n"
        for off in offsets:
            out += f"{off:010d} 00000 n \n".encode("latin-1")
        out += (
            f"trailer\n<< /Size {count} /Root 1 0 R "
            f"/Info << /Title (Sujan Sapkota - CV) /Author (Sujan Sapkota) "
            f"/Creator (tools/build_resume_pdf.py) >> >>\n"
            f"startxref\n{xref_at}\n%%EOF\n"
        ).encode("latin-1")

        return bytes(out)


# ------------------------------------------------------------------- content --

CONTACT = "+977 9867970707  |  Chitwan, Nepal  |  sujansapkota0923@gmail.com"
LINKS = (
    "github.com/SujanSapkota0923  |  "
    "linkedin.com/in/sujan-sapkota-a254a6215  |  "
    "portfolio.sujansapkota07.com.np"
)

SUMMARY = (
    "Computer Engineering graduate with practical experience in network administration, "
    "cloud infrastructure, SecOps, and enterprise IT operations. Proven technical background "
    "through hands-on roles as a Cloud & Infrastructure Engineer and Network Trainee at "
    "Kontract IT Support, complemented by network support training at Nepal Telecom and a "
    "DevOps & SecOps fellowship at Leapfrog Technology. Skilled in managing AWS multi-region "
    "environments, Docker/Kubernetes containerization, Terraform IaC, and zero-trust network "
    "security."
)

EDUCATION = [
    (
        "Bachelor of Engineering in Computer Engineering",
        "April 2021 - June 2025",
        "Kathmandu Engineering College (KEC), Tribhuvan University, Kathmandu",
    ),
    (
        "Higher Secondary Education - Science",
        "Jul 2018 - May 2020",
        "Trinity International College and Higher Secondary School, Kathmandu",
    ),
    (
        "Secondary Education (SEE)",
        "Mar 2008 - Apr 2018",
        "New Oasis Academy Higher Secondary School, Baglung",
    ),
]

SKILLS = [
    ("System Administration", "Linux Administration, Windows Administration, User Management, Access Control, Process Monitoring, System Troubleshooting"),
    ("Networking", "TCP/IP, VLANs, Routing, Switching, Subnetting, DHCP, DNS, Cisco Packet Tracer, Network Troubleshooting"),
    ("Infrastructure", "Docker, Containerization, Virtual Machines, Load Balancing, Infrastructure Monitoring"),
    ("Cybersecurity", "Vulnerability Assessment, Security Monitoring, Information Gathering, Burp Suite, Wireshark, Access Control, Security Best Practices"),
    ("Cloud & DevOps", "AWS, GitHub Actions, CI/CD Pipelines, Automation, Terraform, Kubernetes, Infrastructure Deployment"),
    ("Databases & Storage", "SQL, Redis, Database Administration, Backup and Recovery Concepts"),
    ("Programming", "Python, C, C++, Bash Scripting"),
    ("Tools", "Git, GitHub, Postman, Linux CLI, Monitoring Tools"),
    ("Operating Systems", "Linux, Windows, macOS"),
    ("Soft Skills", "Technical Support, Incident Response, Problem Solving, Documentation, Communication, Team Leadership"),
]

EXPERIENCE = [
    (
        "Cloud & Infrastructure Engineer",
        "February 2026 - Present",
        "Kontract IT Support",
        [
            "Provision, configure, and maintain hybrid enterprise infrastructure utilizing Linux/Windows servers and AWS cloud environments (VPC, EC2, RDS, S3).",
            "Automate multi-environment infrastructure deployment using Infrastructure as Code (Terraform) and setup CI/CD delivery pipelines with GitHub Actions.",
            "Manage containerized workload deployments, orchestration, and service networking using Docker and Kubernetes clusters.",
            "Enforce network security using site-to-site IPsec VPNs, subnets, custom routing, security groups, and AWS Web Application Firewall (WAF).",
            "Monitor system health, centralize logs, and implement automated threat alerts using AWS CloudWatch, GuardDuty, and Security Hub.",
        ],
    ),
    (
        "Network & Systems Trainee",
        "November 2025 - January 2026",
        "Kontract IT Support",
        [
            "Assisted senior infrastructure engineers in managing local office network hardware, routers, switches, VLANs, and firewall policies.",
            "Configured web and database servers on Linux environments, including Nginx reverse proxy configuration, SSL setup, and DNS management.",
            "Handled user access control, IAM policies, and system administration under direct supervision following organizational security practices.",
            "Conducted routine network monitoring, system health checks, and maintained comprehensive infrastructure technical documentation.",
            "Gained hands-on exposure to cloud onboarding, subnetting, and foundational security auditing practices.",
        ],
    ),
    (
        "DevOps & SecOps Fellow",
        "June 2025 - August 2025",
        "Leapfrog Technology",
        [
            "Completed hands-on training in DevOps, cloud infrastructure, Linux systems, and security operations.",
            "Worked with containerized environments and deployment workflows using Docker and CI/CD pipelines.",
            "Performed security assessments, reconnaissance, vulnerability identification, and infrastructure hardening exercises.",
            "Monitored system performance and analyzed logs to identify operational and security-related issues.",
            "Gained practical exposure to cloud-native infrastructure and operational best practices.",
        ],
    ),
    (
        "IT Intern - ISSD",
        "September 2024 - December 2024",
        "Nepal Telecom",
        [
            "Assisted engineers in network monitoring, troubleshooting, and system maintenance activities.",
            "Observed operation of enterprise-scale networking and telecommunication infrastructure.",
            "Supported hardware and software troubleshooting tasks within the department.",
            "Participated in routine maintenance and operational activities to ensure service reliability.",
            "Gained practical exposure to enterprise IT support workflows and infrastructure management.",
        ],
    ),
    (
        "Website Administrator",
        "May 2024 - July 2024",
        "Intel Institute - INTEL afterSEE",
        [
            "Managed and maintained institutional web services and digital resources.",
            "Administered Moodle-based online examination and learning management systems.",
            "Provided technical support to staff and students for platform-related issues.",
            "Assisted in maintaining service availability and user access management.",
        ],
    ),
]

PROJECTS = [
    (
        "Nepashray - Django Social Platform Backend",
        "github.com/SujanSapkota0923/Nepashray",
        [
            "Developed secure user authentication with login and email-based password recovery.",
            "Built dynamic dashboards for monitoring likes/comments, managing posts, and an admin panel for post verification.",
        ],
    ),
    (
        "URL Shortener",
        "github.com/SujanSapkota0923/URL-Shortner",
        [
            "Built a URL shortening service with customizable slugs, Base64-generated keys, and automatic expiry support.",
            "Implemented high-performance storage using Redis and tracked detailed click analytics for each shortened link.",
        ],
    ),
    (
        "Hotel Booking Cancellation Prediction",
        None,
        [
            "Trained a machine learning classification model to predict booking cancellations using data preprocessing and feature engineering.",
            "Performed exploratory data analysis (EDA) and data visualization to identify key cancellation drivers.",
        ],
    ),
]

ACHIEVEMENTS = [
    (
        "President, KEC IT Club (2024/25)",
        "Led organization of workshops and bootcamps covering Web3.0, GitHub, Data Manipulation (NumPy, Pandas), Linux, and Open Source Contribution.",
    ),
    (
        "1st Place, WISE BEE Hackathon (2023)",
        "Won by developing a Hotel Booking Cancellation EDA and Prediction model.",
    ),
    (
        "KIST HackFest 2024 - 48-Hour Hackathon",
        "Built a computer vision web application for exercise pose analysis, rep counting, feedback, and gamified leaderboards.",
    ),
    (
        'PALS "Think Create Engineer" Program (2023)',
        "Residential program at IIT Madras, India; developed an Airport Passenger Feedback System as a final project.",
    ),
]


def render():
    pdf = Pdf()

    # Header
    name = "Sujan Sapkota"
    w = text_width(name, "bold", 22)
    pdf.text(name, (PAGE_W - w) / 2, pdf.y, 22, "bold")
    pdf.y -= 18

    for line, size, color in (
        ("Computer Engineering Graduate", 10.5, INK),
        ("Cloud Infrastructure | Networking | Information Systems", 9.5, MUTED),
        (CONTACT, 9, INK),
        (LINKS, 8.6, MUTED),
    ):
        w = text_width(line, "regular", size)
        pdf.text(line, (PAGE_W - w) / 2, pdf.y, size, "regular", color)
        pdf.y -= 13 if size > 9 else 12

    pdf.y -= 2
    pdf.rule(pdf.y, color="0.2 0.2 0.2", width=1.0)
    pdf.y -= 6

    pdf.heading("Summary")
    pdf.paragraph(SUMMARY)

    pdf.heading("Education")
    for title, dates, org in EDUCATION:
        pdf.role(title, dates, org)
        pdf.y -= 2

    pdf.heading("Technical Skills")
    for label, value in SKILLS:
        pdf.labelled(label, value)

    pdf.heading("Experience")
    for title, dates, org, items in EXPERIENCE:
        pdf.role(title, dates, org)
        pdf.bullets(items)

    pdf.heading("Personal Projects")
    for title, repo, items in PROJECTS:
        pdf.role(title, repo or "", None)
        pdf.bullets(items)

    pdf.heading("Certifications")
    pdf.bullets(["Google Foundations of Cybersecurity - Coursera, 2023"])

    pdf.heading("Achievements")
    for title, detail in ACHIEVEMENTS:
        pdf.ensure(30)
        pdf.text(title, MARGIN_X, pdf.y, 9.5, "bold")
        pdf.y -= 11.5
        pdf.paragraph(detail, size=9, color=MUTED)

    pdf.ensure(20)
    pdf.y -= 4
    pdf.text("References available on request.", MARGIN_X, pdf.y, 8.6, "regular", MUTED)

    return pdf.build()


if __name__ == "__main__":
    here = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    target = os.path.join(here, "assets", "docs", "resume.pdf")
    data = render()
    with open(target, "wb") as fh:
        fh.write(data)
    print(f"wrote {target} ({len(data)} bytes)")
