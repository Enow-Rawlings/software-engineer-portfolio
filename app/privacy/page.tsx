'use client'

import Link from 'next/link'

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Privacy Policy</p>
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-base text-muted-foreground leading-8">
            This Privacy Policy explains how Akoh Rawlings Enow collects, uses,
            and protects your information when you visit this portfolio website.
          </p>
        </div>

        <section className="space-y-4 bg-card border border-border rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Information Collection</h2>
          <p className="text-sm text-muted-foreground leading-7">
            The site does not collect personal information beyond what is
            voluntarily submitted through the contact form. No tracking or
            analytics services are used unless explicitly disclosed.
          </p>
        </section>

        <section className="space-y-4 bg-card border border-border rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Use of Information</h2>
          <p className="text-sm text-muted-foreground leading-7">
            Information submitted via the contact form is used only to respond
            to inquiries and to manage communication. It is not sold or shared
            with third parties for marketing purposes.
          </p>
        </section>

        <section className="space-y-4 bg-card border border-border rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Cookies and Tracking</h2>
          <p className="text-sm text-muted-foreground leading-7">
            The website may use cookies or browser storage for theme preferences
            or basic interface behavior, but it does not rely on invasive
            tracking technologies.
          </p>
        </section>

        <section className="space-y-4 bg-card border border-border rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <p className="text-sm text-muted-foreground leading-7">
            If you have questions about this Privacy Policy, please use the
            contact page to get in touch.
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
