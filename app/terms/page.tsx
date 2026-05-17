'use client'

import Link from 'next/link'

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-background text-foreground py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Terms of Service</p>
          <h1 className="text-4xl font-bold">Terms of Service</h1>
          <p className="text-base text-muted-foreground leading-8">
            These terms govern your use of the portfolio website owned and
            operated by Akoh Rawlings Enow.
          </p>
        </div>

        <section className="space-y-4 bg-card border border-border rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Use of the Site</h2>
          <p className="text-sm text-muted-foreground leading-7">
            The site is provided for informational and contact purposes only.
            You agree to use it responsibly and not to attempt to disrupt the
            site or misuse any contact mechanisms.
          </p>
        </section>

        <section className="space-y-4 bg-card border border-border rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Intellectual Property</h2>
          <p className="text-sm text-muted-foreground leading-7">
            All content, branding, and design on this website are the property of
            Akoh Rawlings Enow unless otherwise noted. Reproduction or reuse
            requires permission.
          </p>
        </section>

        <section className="space-y-4 bg-card border border-border rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Disclaimer</h2>
          <p className="text-sm text-muted-foreground leading-7">
            The portfolio is provided "as is" without warranties. The owner is
            not liable for any damages that result from using the site.
          </p>
        </section>

        <section className="space-y-4 bg-card border border-border rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Changes</h2>
          <p className="text-sm text-muted-foreground leading-7">
            These terms may change over time. Continued use of the site after
            changes implies acceptance of the updated terms.
          </p>
        </section>

        <div className="flex justify-end">
          <Link href="/" className="text-primary hover:underline">
            Return home
          </Link>
        </div>
      </div>
    </main>
  )
}
