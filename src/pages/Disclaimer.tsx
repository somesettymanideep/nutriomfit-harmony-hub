import Layout from "@/components/layout/Layout";
import PageBanner from "@/components/ui/PageBanner";
import { AlertTriangle, XCircle, CheckCircle } from "lucide-react";

const Disclaimer = () => {
  return (
    <Layout>
      <PageBanner
        badge="Legal"
        title="Medical"
        highlight="Disclaimer"
        description="Important information about our wellness services and their limitations."
        icon={<AlertTriangle size={16} />}
      />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Important Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 mb-12">
              <div className="flex items-start gap-4">
                <AlertTriangle className="text-amber-600 flex-shrink-0 mt-1" size={28} />
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground mb-2">
                    Important Notice
                  </h2>
                  <p className="text-muted-foreground">
                    NUTRIOMFIT's services are for{" "}
                    <strong>
                      general wellness, education and lifestyle improvement only
                    </strong>
                    . Please read this disclaimer carefully before participating
                    in any of our programs.
                  </p>
                </div>
              </div>
            </div>

            {/* What We Do NOT Provide */}
            <div className="mb-12">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                What We Do NOT Provide
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Diagnose medical conditions",
                  "Prescribe medication",
                  "Offer medical, physiotherapy or clinical dietetic advice",
                  "Replace healthcare professionals",
                  "Provide emergency treatment",
                  "Claim to cure or treat any disease",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-100"
                  >
                    <XCircle className="text-red-500 flex-shrink-0" size={20} />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What We Do Provide */}
            <div className="mb-12">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                What We DO Provide
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "General wellness guidance",
                  "Educational yoga sessions",
                  "Lifestyle improvement programs",
                  "Nutritional awareness coaching",
                  "Mindfulness practices",
                  "Fitness and strength training",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10"
                  >
                    <CheckCircle className="text-primary flex-shrink-0" size={20} />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Disclaimer */}
            <div className="prose prose-lg prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground">
              <h2>Consultation Requirement</h2>
              <p>
                <strong>
                  You must consult your GP/health professional before joining
                  any program.
                </strong>{" "}
                This is especially important if you have:
              </p>
              <ul>
                <li>Heart conditions or cardiovascular issues</li>
                <li>Diabetes or blood sugar imbalances</li>
                <li>Pregnancy or recent childbirth</li>
                <li>Joint or musculoskeletal problems</li>
                <li>Mental health conditions</li>
                <li>Any chronic illness or ongoing treatment</li>
              </ul>

              <h2>Program-Specific Disclaimers</h2>

              <h3>Yoga & Fitness Programs</h3>
              <p>
                All yoga and strength training sessions involve physical
                activity that may not be suitable for everyone. Participants are
                responsible for understanding their own limitations and working
                within them. Always inform your instructor of any injuries or
                conditions before sessions.
              </p>

              <h3>Diet & Nutrition Programs</h3>
              <p>
                Our nutritional guidance is for general wellness purposes only.
                We are not clinical dietitians. The dietary recommendations
                provided are educational in nature and should not replace advice
                from a registered dietitian or medical professional, especially
                for individuals with specific medical conditions.
              </p>

              <h3>LSP & Juice Fasting</h3>
              <p>
                Laghu Shankha Prakshalana and juice fasting programs involve
                cleansing practices that may have significant effects on the
                body. These programs:
              </p>
              <ul>
                <li>Are NOT suitable for everyone</li>
                <li>Require medical eligibility screening</li>
                <li>Should NOT be attempted without supervision</li>
                <li>
                  Are NOT a replacement for medical treatment or detoxification
                </li>
              </ul>

              <h3>Kids Yoga</h3>
              <p>
                Parents/guardians are responsible for ensuring their child's
                safety during sessions. We recommend supervision for younger
                participants. Any medical conditions must be disclosed before
                enrollment.
              </p>

              <h2>Assumption of Risk</h2>
              <p>
                By participating in any NUTRIOMFIT program, you acknowledge and
                accept that:
              </p>
              <ul>
                <li>
                  Physical activity carries inherent risks of injury or
                  discomfort
                </li>
                <li>
                  You are voluntarily participating with full knowledge of these
                  risks
                </li>
                <li>
                  You are responsible for your own health and safety during
                  practice
                </li>
                <li>
                  Results may vary and are not guaranteed for any participant
                </li>
              </ul>

              <h2>Emergency Situations</h2>
              <p>
                Since all our services are provided online, NUTRIOMFIT cannot
                provide emergency assistance. If you experience any of the
                following during a session:
              </p>
              <ul>
                <li>Severe pain or discomfort</li>
                <li>Dizziness or fainting</li>
                <li>Difficulty breathing</li>
                <li>Chest pain</li>
                <li>Nausea or vomiting</li>
              </ul>
              <p>
                <strong>
                  Stop immediately and seek medical attention. Keep emergency
                  contact numbers accessible at all times.
                </strong>
              </p>

              <h2>Limitation of Liability</h2>
              <p>
                NUTRIOMFIT, its instructors, and affiliates shall not be held
                liable for any injuries, health complications, or adverse
                effects arising from participation in our programs. This
                includes, but is not limited to:
              </p>
              <ul>
                <li>Physical injuries during practice</li>
                <li>Adverse reactions to dietary changes</li>
                <li>
                  Complications arising from undisclosed medical conditions
                </li>
                <li>Emotional or psychological effects</li>
              </ul>
            </div>

            {/* Footer Disclaimer */}
            <div className="mt-12 p-6 bg-secondary rounded-xl text-center">
              <p className="text-muted-foreground">
                <strong>NUTRIOMFIT provides general wellness guidance only.</strong>
                <br />
                Our programs do not replace medical advice, diagnosis or
                treatment.
                <br />
                Consult a GP before beginning any fitness, yoga or fasting
                program.
                <br />
                Participation in online sessions is at your own risk.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Disclaimer;
