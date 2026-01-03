import Layout from "@/components/layout/Layout";
import PageBanner from "@/components/ui/PageBanner";
import { Shield } from "lucide-react";

const Privacy = () => {
  return (
    <Layout>
      <PageBanner
        badge="Legal"
        title="Privacy"
        highlight="Policy"
        description="How we collect, manage, use and protect your personal data."
        icon={<Shield size={16} />}
      />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground">
            <p className="text-sm text-muted-foreground mb-8">
              Last Updated: December 2024
            </p>

            <p>
              This Privacy Policy explains how NUTRIOMFIT collects, manages,
              uses and protects your personal data in compliance with the UK
              General Data Protection Regulation (UK GDPR) and the Data
              Protection Act 2018.
            </p>

            <h2>1. Data We Collect</h2>

            <h3>A. Personal Identification Information</h3>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Date of birth</li>
            </ul>

            <h3>B. Health & Wellness Information (Voluntary)</h3>
            <ul>
              <li>Medical conditions</li>
              <li>Past injuries</li>
              <li>Dietary restrictions</li>
              <li>Physical activity levels</li>
              <li>Lifestyle information</li>
            </ul>

            <h3>C. Technical Data</h3>
            <ul>
              <li>Device type</li>
              <li>IP address</li>
              <li>Browser information</li>
            </ul>

            <h3>D. Payment Information</h3>
            <p>
              Handled securely via third-party providers (not stored by
              NUTRIOMFIT).
            </p>

            <h2>2. Why We Collect Data</h2>
            <p>We use your data to:</p>
            <ul>
              <li>Provide personalised diet plans</li>
              <li>Create suitable yoga/fitness programs</li>
              <li>Ensure safety during participation</li>
              <li>Improve website and service performance</li>
              <li>
                Send updates, reminders and program-related communication
              </li>
            </ul>
            <p>
              <strong>We will never sell your data.</strong>
            </p>

            <h2>3. Legal Basis for Processing</h2>
            <p>We process data under:</p>
            <ul>
              <li>Consent</li>
              <li>Contractual necessity</li>
              <li>Legitimate interest</li>
              <li>Legal compliance</li>
            </ul>
            <p>You may withdraw consent at any time.</p>

            <h2>4. Sharing Your Personal Data</h2>
            <p>We do not share your data with third parties except:</p>
            <ul>
              <li>Payment processors</li>
              <li>Legal authorities (only if required by law)</li>
            </ul>
            <p>We do not share data with advertisers.</p>

            <h2>5. Data Storage & Security</h2>
            <p>Your data is stored securely with:</p>
            <ul>
              <li>Encrypted servers</li>
              <li>Access restrictions</li>
              <li>Regular security checks</li>
            </ul>
            <p>We retain data only as long as necessary.</p>

            <h2>6. Your Rights (UK GDPR)</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your data</li>
              <li>Request correction</li>
              <li>Request deletion ("right to be forgotten")</li>
              <li>Restrict processing</li>
              <li>Object to processing</li>
              <li>Data portability</li>
              <li>Withdraw consent</li>
            </ul>
            <p>Contact us at hello@nutriomfit.com for any data requests.</p>

            <h2>7. Children's Data</h2>
            <p>For Kids Yoga:</p>
            <ul>
              <li>Information is collected with parent/guardian consent</li>
              <li>Data is never used for marketing</li>
              <li>Data is deleted when no longer needed</li>
            </ul>

            <h2>8. Cookies Policy</h2>
            <p>Our website may use cookies to:</p>
            <ul>
              <li>Improve user experience</li>
              <li>Track site analytics</li>
              <li>Remember preferences</li>
            </ul>
            <p>You can disable cookies in your browser settings.</p>

            <h2>9. Updates to this Policy</h2>
            <p>
              We may update this policy and will publish the new version on our
              website.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
