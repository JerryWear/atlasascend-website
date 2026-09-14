export default function PrivacyPolicy() {
  const sectionClass = 'space-y-3'
  const headingClass = 'font-playfair text-white text-2xl'
  const textClass = 'font-inter text-white-muted text-sm leading-relaxed'
  const listClass =
    'font-inter text-white-muted text-sm leading-relaxed list-disc pl-6 space-y-2'

  return (
    <main className="max-w-3xl mx-auto px-6 py-24">
      <header className="mb-12">
        <p className="font-inter text-gold text-xs uppercase tracking-[0.2em] mb-4">
          Atlas Ascend
        </p>

        <h1 className="font-playfair text-white text-4xl md:text-5xl mb-4">
          Privacy Policy
        </h1>

        <p className={textClass}>Last updated: 14 September 2026</p>
      </header>

      <div className="space-y-10">
        <section className={sectionClass}>
          <p className={textClass}>
            Atlas Ascend respects your privacy and is committed to protecting
            your personal information.
          </p>

          <p className={textClass}>
            Atlas Ascend is currently operated by Zirunas Michailovas, founder
            of Atlas Aion Group. References in this Privacy Policy to
            &ldquo;Atlas Ascend,&rdquo; &ldquo;Atlas,&rdquo; &ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our&rdquo; refer to the operation of
            the Atlas Ascend application and related services.
          </p>

          <p className={textClass}>
            This Privacy Policy explains what information Atlas Ascend may
            collect, why it is collected, how it is used and protected, when it
            may be processed by service providers, and the choices and rights
            available to you.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>1. Information You Provide</h2>

          <p className={textClass}>
            Depending on how you use Atlas Ascend, you may provide information
            including:
          </p>

          <ul className={listClass}>
            <li>
              <strong className="text-white">Account and profile information</strong>,
              such as your email address, profile information and information
              you provide during account setup.
            </li>
            <li>
              <strong className="text-white">Fitness and training information</strong>,
              including workouts, exercises, training programs, performance
              information, personal bests, training history and goals.
            </li>
            <li>
              <strong className="text-white">Nutrition information</strong>,
              including foods, meals, calorie and macronutrient information,
              food diary entries, nutrition goals and meal plans.
            </li>
            <li>
              <strong className="text-white">Body and progress information</strong>,
              which may include body weight, body-fat information, progress
              measurements, progress photographs and other information you
              choose to record.
            </li>
            <li>
              <strong className="text-white">Wellness and lifestyle information</strong>,
              such as goals, habits, water intake, sleep information and other
              wellness information you voluntarily enter.
            </li>
            <li>
              <strong className="text-white">Communications and community content</strong>,
              including messages, profile content and other information you
              choose to share through communication or community features.
            </li>
            <li>
              <strong className="text-white">Atlas AI conversations</strong>,
              including messages and information you voluntarily provide when
              interacting with Atlas AI or AI Coach.
            </li>
          </ul>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>2. Photos, Camera and Media</h2>

          <p className={textClass}>
            Atlas Ascend may request access to your camera or photo library when
            you choose to use features that require them, such as profile
            photographs, progress photographs, food-related features or other
            media functionality.
          </p>

          <p className={textClass}>
            Atlas Ascend does not access your photos or camera for unrelated
            purposes.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>3. Health and Fitness Information</h2>

          <p className={textClass}>
            Atlas Ascend is a health and fitness platform. Information you
            voluntarily provide may include fitness, nutrition,
            body-composition and wellness information.
          </p>

          <p className={textClass}>
            We use this information to provide features you request, including
            training guidance, nutrition tools, progress tracking, goal
            tracking, personalized recommendations and related Atlas Ascend
            functionality.
          </p>

          <p className={textClass}>
            Health and fitness information is not used by Atlas Ascend for
            third-party advertising.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>4. Atlas AI</h2>

          <p className={textClass}>
            Atlas Ascend provides conversational artificial-intelligence
            functionality through Atlas AI.
          </p>

          <p className={textClass}>
            Information you submit to Atlas AI may be processed to generate
            responses, guidance and other functionality requested by you.
          </p>

          <p className={textClass}>
            Atlas Ascend currently uses technology provided by Anthropic to
            support AI processing. Information necessary to generate an AI
            response may therefore be transmitted securely to Anthropic for
            processing.
          </p>

          <p className={textClass}>
            Atlas Ascend does not authorize AI service providers to use Atlas
            Ascend user information for advertising on behalf of Atlas Ascend.
          </p>

          <p className={textClass}>
            AI-generated information is provided for informational,
            educational and fitness-support purposes and should not be treated
            as a substitute for professional medical diagnosis or emergency
            medical care.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>5. Location</h2>

          <p className={textClass}>
            The current version of Atlas Ascend does not collect precise device
            GPS location.
          </p>

          <p className={textClass}>
            If location-based functionality is introduced in a future version,
            this Privacy Policy and relevant in-app disclosures will be updated
            before such information is collected.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>
            6. Apple Health and Google Health Connect
          </h2>

          <p className={textClass}>
            Integration with Apple Health and Google Health Connect is planned
            for a future version of Atlas Ascend but is not part of the current
            release.
          </p>

          <p className={textClass}>
            Atlas Ascend will not access information from these services unless
            the relevant integration is introduced and you explicitly grant
            the required permissions.
          </p>

          <p className={textClass}>
            Before such functionality is introduced, applicable privacy
            disclosures will be updated to explain what information is accessed
            and how it is used.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>7. Notifications</h2>

          <p className={textClass}>
            If you enable notifications, Atlas Ascend may process device
            notification identifiers and notification preferences in order to
            send requested app notifications, reminders, messages and
            service-related information.
          </p>

          <p className={textClass}>
            You can control notification permissions through your device
            settings.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>8. How We Use Information</h2>

          <p className={textClass}>We may use information to:</p>

          <ul className={listClass}>
            <li>Create and manage your account.</li>
            <li>Provide training and fitness functionality.</li>
            <li>Provide nutrition and meal-planning functionality.</li>
            <li>Record and display your progress.</li>
            <li>Personalize your Atlas Ascend experience.</li>
            <li>Provide Atlas AI functionality.</li>
            <li>Operate community and communication features.</li>
            <li>Provide goals, habits and wellness functionality.</li>
            <li>Send requested notifications.</li>
            <li>Maintain application security and reliability.</li>
            <li>Diagnose technical problems.</li>
            <li>Prevent abuse or misuse.</li>
            <li>Improve Atlas Ascend and its features.</li>
            <li>Comply with applicable legal obligations.</li>
          </ul>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>9. Service Providers</h2>

          <p className={textClass}>
            Atlas Ascend uses third-party service providers where necessary to
            operate the application. These may include providers supporting
            application infrastructure and hosting, authentication and database
            services, AI processing, application deployment, notifications,
            subscription infrastructure, security and reliability.
          </p>

          <p className={textClass}>
            Service providers receive information as necessary to provide their
            services and are expected to handle information appropriately and
            securely.
          </p>

          <p className={textClass}>
            <strong className="text-white">
              Atlas Ascend does not sell your personal information.
            </strong>
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>10. Payments and Subscriptions</h2>

          <p className={textClass}>
            Where paid subscriptions or purchases are available through Atlas
            Ascend, payment transactions may be processed through the
            applicable platform provider, such as the Apple App Store or Google
            Play.
          </p>

          <p className={textClass}>
            Atlas Ascend does not receive or store your complete payment-card
            details from purchases processed by those platforms.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>11. Data Storage and Security</h2>

          <p className={textClass}>
            Atlas Ascend uses technical and organizational safeguards intended
            to protect personal information against unauthorized access,
            alteration, disclosure or destruction.
          </p>

          <p className={textClass}>
            Information transmitted between the application and its backend
            services is transmitted using secure network connections where
            supported. No electronic storage or transmission system can
            guarantee absolute security.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>12. Data Retention</h2>

          <p className={textClass}>
            We retain personal information for as long as reasonably necessary
            to provide Atlas Ascend, maintain your account, comply with legal
            obligations, resolve disputes, enforce agreements and protect the
            security of the service.
          </p>

          <p className={textClass}>
            Information may be deleted or anonymized when it is no longer
            required for these purposes.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>13. Account and Data Deletion</h2>

          <p className={textClass}>
            Atlas Ascend allows users to initiate account deletion from within
            the application.
          </p>

          <p className={textClass}>
            When you request deletion of your account, Atlas Ascend will delete
            or anonymize personal information associated with the account
            except where information must be retained for legitimate legal,
            security, fraud-prevention or regulatory purposes.
          </p>

          <p className={textClass}>
            You may also contact{' '}
            <a
              href="mailto:privacy@atlasascend.app"
              className="text-gold hover:underline"
            >
              privacy@atlasascend.app
            </a>{' '}
            regarding privacy or data-deletion questions.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>14. Your Privacy Rights</h2>

          <p className={textClass}>
            Depending on where you live, you may have rights concerning your
            personal information, including rights to:
          </p>

          <ul className={listClass}>
            <li>Request access to your personal information.</li>
            <li>Request correction of inaccurate information.</li>
            <li>Request deletion of your information.</li>
            <li>Restrict or object to certain processing.</li>
            <li>Request portability of information where applicable.</li>
            <li>Withdraw consent where processing is based on consent.</li>
          </ul>

          <p className={textClass}>
            Users in the European Economic Area and other jurisdictions may
            have additional rights under applicable data-protection law.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>15. Children</h2>

          <p className={textClass}>
            Atlas Ascend is not intended for children below the minimum age
            permitted to use the service under applicable law. Where age
            restrictions or parental-consent requirements apply, Atlas Ascend
            may restrict access or require appropriate authorization.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>16. Medical Disclaimer</h2>

          <p className={textClass}>
            Atlas Ascend provides health, fitness, nutrition and wellness
            information for informational and educational purposes.
          </p>

          <p className={textClass}>
            Atlas Ascend does not provide emergency medical services and is not
            intended to replace qualified healthcare professionals. Users
            should seek appropriate professional medical advice when making
            decisions concerning medical conditions, symptoms, injuries,
            medications or treatment.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>17. Changes to This Privacy Policy</h2>

          <p className={textClass}>
            We may update this Privacy Policy when Atlas Ascend changes, when
            new functionality is introduced, or when legal or regulatory
            requirements change.
          </p>

          <p className={textClass}>
            The &ldquo;Last updated&rdquo; date at the top of this policy
            identifies the latest revision.
          </p>
        </section>

        <section className={`${sectionClass} border-t border-white/10 pt-8`}>
          <h2 className={headingClass}>18. Contact</h2>

          <p className={textClass}>
            For privacy questions, data requests or concerns regarding this
            Privacy Policy:
          </p>

          <div className={textClass}>
            <p className="text-white font-medium">Atlas Ascend</p>
            <p>Operator: Zirunas Michailovas</p>
            <p>Founder of Atlas Aion Group</p>
            <p>
              Email:{' '}
              <a
                href="mailto:privacy@atlasascend.app"
                className="text-gold hover:underline"
              >
                privacy@atlasascend.app
              </a>
            </p>
          </div>

          <p className={textClass}>
            Atlas Aion Group is currently the business identity under which
            Atlas Ascend is being developed and operated. Legal entity
            information will be updated when the relevant corporate
            registration is completed.
          </p>
        </section>
      </div>
    </main>
  )
}
