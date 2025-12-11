import Layout from "@/components/layout/Layout";
import PageBanner from "@/components/ui/PageBanner";
import { FileText } from "lucide-react";

const Terms = () => {
  return (
    <Layout>
      <PageBanner
        badge="Legal"
        title="Terms &"
        highlight="Conditions"
        description="Please read these terms carefully before using our services."
        icon={<FileText size={16} />}
      />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground">
            <p className="text-sm text-muted-foreground mb-8">
              Last Updated: December 2024
            </p>

            <p>
              Welcome to NUTRIOMFIT. By accessing, enrolling in or using our
              website, online classes, programs or services, you agree to the
              following Terms & Conditions. Please read them carefully before
              proceeding.
            </p>

            <h2>1. About NUTRIOMFIT</h2>
            <p>
              NUTRIOMFIT provides wellness services including yoga-based
              programs, strength-based sessions, kids yoga classes, guided juice
              fasting frameworks, and personalised nutritional guidance. All
              services are delivered online, via live instructor-led sessions or
              digital communication.
            </p>
            <p>
              NUTRIOMFIT does not provide medical treatment, medical diagnosis,
              physiotherapy, emergency care, or clinical dietetic services.
            </p>

            <h2>2. Eligibility & Participation</h2>
            <p>You must be:</p>
            <ul>
              <li>18 years or older to enrol in adult programs.</li>
              <li>
                A parent/guardian must enrol children aged 7–14 in Kids Yoga.
              </li>
              <li>
                Physically able to participate in mild to moderate exercise
                unless medically advised otherwise.
              </li>
            </ul>
            <p>
              NUTRIOMFIT reserves the right to deny participation if a program
              is not suitable due to:
            </p>
            <ul>
              <li>Pre-existing medical conditions</li>
              <li>Severe injuries</li>
              <li>Cardiovascular or neurological conditions</li>
              <li>Contraindications for fasting or yoga cleansing</li>
            </ul>
            <p>We may request a medical clearance where appropriate.</p>

            <h2>3. Online Services & Technology Requirements</h2>
            <p>You are responsible for:</p>
            <ul>
              <li>Stable internet connection</li>
              <li>
                Safe practice environment (adequate space, non-slip surfaces)
              </li>
              <li>Proper equipment (yoga mat, light dumbbells, etc.)</li>
            </ul>
            <p>
              NUTRIOMFIT is not liable for service interruptions due to
              user-side technical issues.
            </p>

            <h2>4. Payment & Refund Policy</h2>
            <ul>
              <li>All payments must be made in advance.</li>
              <li>
                Access to programs is granted only after successful payment.
              </li>
              <li>Refunds are not provided once the program has begun.</li>
              <li>
                Refunds may be granted before the start date, at the discretion
                of NUTRIOMFIT.
              </li>
              <li>
                For subscriptions, cancellations must be made at least 48 hours
                before renewal.
              </li>
            </ul>

            <h2>5. Health, Risk & Safety Responsibilities</h2>
            <p>By participating, you acknowledge that:</p>
            <ul>
              <li>
                Yoga, strength training and fasting may involve physical
                exertion and emotional shifts.
              </li>
              <li>
                You voluntarily assume all risks associated with these
                activities.
              </li>
              <li>
                You must stop immediately if you experience dizziness, pain,
                discomfort or breathlessness.
              </li>
              <li>
                You must consult a healthcare provider before beginning any
                program, especially if you have pre-existing conditions.
              </li>
            </ul>
            <p>
              NUTRIOMFIT does not guarantee weight loss, disease reversal or
              specific outcomes.
            </p>

            <h2>6. Kids Yoga Policy</h2>
            <p>Parents/guardians must:</p>
            <ul>
              <li>Ensure a safe practice space for the child.</li>
              <li>
                Supervise the child during online sessions (recommended).
              </li>
              <li>
                Confirm the child has no contraindicating medical conditions.
              </li>
            </ul>
            <p>Kids Yoga is non-competitive, educational and safety-focused.</p>

            <h2>7. LSP + Juice Fasting Program Conditions</h2>
            <p>Participants must:</p>
            <ul>
              <li>Fill a medical declaration form honestly.</li>
              <li>
                Understand this is not a medical detox or a replacement for
                medical treatment.
              </li>
              <li>
                Stop immediately and contact a doctor if experiencing severe
                fatigue, vomiting, abdominal pain, dizziness or fainting.
              </li>
            </ul>
            <p>This program is not suitable for:</p>
            <ul>
              <li>Pregnant or breastfeeding women</li>
              <li>Individuals with kidney disease</li>
              <li>Diabetics on insulin or hypoglycaemics</li>
              <li>Individuals with severe GI disorders</li>
              <li>Elderly participants with frailty</li>
              <li>Anyone advised against fasting by a doctor</li>
            </ul>

            <h2>8. First Aid & Emergency Clause</h2>
            <p>Since services are provided online:</p>
            <ul>
              <li>NUTRIOMFIT cannot physically deliver first aid.</li>
              <li>
                Participants must keep emergency contact numbers accessible.
              </li>
              <li>
                In case of discomfort during a session, participants must stop
                and seek medical care immediately.
              </li>
            </ul>
            <p>
              NUTRIOMFIT provides general wellness guidance only, not emergency
              health services.
            </p>

            <h2>9. Liability Limitation</h2>
            <p>
              To the fullest extent permitted by UK law, NUTRIOMFIT shall not be
              liable for:
            </p>
            <ul>
              <li>Injuries resulting from improper practice environment</li>
              <li>Failure to follow instructions</li>
              <li>Pre-existing or undisclosed medical conditions</li>
              <li>Outcomes of fasting or exercise</li>
              <li>Emotional or physical stress responses</li>
            </ul>
            <p>Our programs offer general wellness guidance only.</p>

            <h2>10. Intellectual Property</h2>
            <p>All content, including:</p>
            <ul>
              <li>Videos</li>
              <li>Program modules</li>
              <li>Session recordings</li>
              <li>Written materials</li>
              <li>Images & branding</li>
            </ul>
            <p>
              …is the property of NUTRIOMFIT and may not be copied, distributed,
              or shared without written consent.
            </p>

            <h2>11. Prohibited Actions</h2>
            <p>You must not:</p>
            <ul>
              <li>Record or share any live class</li>
              <li>Share login or access credentials</li>
              <li>Misuse website content</li>
              <li>Provide false medical information</li>
            </ul>
            <p>Violation may result in termination without refund.</p>

            <h2>12. Governing Law</h2>
            <p>
              These Terms are governed by the laws of England & Wales. Disputes
              will be resolved exclusively in UK courts.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
