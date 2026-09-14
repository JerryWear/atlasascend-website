export default function DeleteAccount() {
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
          Delete Your Account
        </h1>

        <p className={textClass}>
          Request deletion of your Atlas Ascend account and associated personal
          data.
        </p>
      </header>

      <div className="space-y-10">
        <section className={sectionClass}>
          <h2 className={headingClass}>Delete your account in Atlas Ascend</h2>

          <p className={textClass}>
            Atlas Ascend allows registered users to initiate deletion of their
            account from within the application.
          </p>

          <ol className="font-inter text-white-muted text-sm leading-relaxed list-decimal pl-6 space-y-2">
            <li>Open Atlas Ascend and sign in to your account.</li>
            <li>Open Settings.</li>
            <li>Select the account deletion option.</li>
            <li>Follow the on-screen instructions and confirm your request.</li>
          </ol>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>Request deletion outside the app</h2>

          <p className={textClass}>
            If you cannot access Atlas Ascend, you can request deletion by
            contacting us from the email address associated with your Atlas
            Ascend account.
          </p>

          <p className={textClass}>
            Send your request to{' '}
            <a
              href="mailto:privacy@atlasascend.app?subject=Atlas%20Ascend%20Account%20Deletion%20Request"
              className="text-gold hover:underline"
            >
              privacy@atlasascend.app
            </a>
            .
          </p>

          <p className={textClass}>
            Please state that you are requesting deletion of your Atlas Ascend
            account. We may need to verify that you control the account before
            completing the request.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>What is deleted</h2>

          <p className={textClass}>
            When an account deletion request is completed, personal information
            associated with the Atlas Ascend account will be deleted or
            anonymized as applicable.
          </p>

          <p className={textClass}>This may include:</p>

          <ul className={listClass}>
            <li>Account and profile information.</li>
            <li>Training and workout information associated with the account.</li>
            <li>Nutrition and food diary information.</li>
            <li>Body measurements and progress information.</li>
            <li>Goals, habits and wellness information.</li>
            <li>Progress photos and other account media where applicable.</li>
            <li>Atlas AI and coaching information associated with the account.</li>
            <li>
              Other personal information associated with the deleted Atlas
              Ascend account, subject to applicable retention requirements.
            </li>
          </ul>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>Information that may be retained</h2>

          <p className={textClass}>
            Limited information may be retained where reasonably necessary for
            legal, security, fraud-prevention, accounting, dispute-resolution
            or regulatory purposes.
          </p>

          <p className={textClass}>
            Information retained for these purposes will be kept only for as
            long as reasonably necessary for the applicable purpose and will
            not be retained merely to continue providing the deleted account.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>Deleting specific data</h2>

          <p className={textClass}>
            If you want to ask about deletion of particular personal
            information without deleting your entire Atlas Ascend account,
            contact us at{' '}
            <a
              href="mailto:privacy@atlasascend.app"
              className="text-gold hover:underline"
            >
              privacy@atlasascend.app
            </a>
            .
          </p>
        </section>

        <section className={`${sectionClass} border-t border-white/10 pt-8`}>
          <h2 className={headingClass}>Privacy contact</h2>

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
            For additional information about how Atlas Ascend handles personal
            information, please review our{' '}
            <a href="/privacy" className="text-gold hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  )
}
