// ===== Workflow data: 9 sample GHL automations =====
// Each workflow: id, label (tab), business, problem, solution, and an SVG diagram (GHL-native terms)

const WORKFLOWS = [
  {
    id: "lead-followup",
    label: "Lead Follow-Up",
    business: "Bright Keys Realty",
    problem: "New leads come in through the website, but if no agent happens to be free, the lead just sits there until someone remembers to call.",
    solution: "The moment a lead is created, GHL sends an instant text, waits, then escalates to a call task if there's no reply — so no lead goes more than a few minutes without contact.",
    alt: "Workflow diagram: a new contact triggers an instant SMS, then a 10-minute wait. If the lead replied, they're tagged Engaged and moved to the next stage; if not, the assigned user gets a call task.",
    svg: `
      <svg viewBox="0 0 980 200" xmlns="http://www.w3.org/2000/svg">
        <defs><marker id="a1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#8E99A4"/></marker></defs>
        <rect x="0" y="20" width="160" height="56" rx="8" fill="#181D23" stroke="#E8702A" stroke-width="1.2"/>
        <text x="80" y="44" text-anchor="middle" class="nlabel">Contact Created</text>
        <text x="80" y="60" text-anchor="middle" class="nsub">Trigger</text>

        <line x1="160" y1="48" x2="218" y2="48" class="nflow" marker-end="url(#a1)"/>
        <rect x="218" y="20" width="160" height="56" rx="8" fill="#181D23" stroke="#3a4248" stroke-width="1"/>
        <text x="298" y="44" text-anchor="middle" class="nlabel">Send SMS</text>
        <text x="298" y="60" text-anchor="middle" class="nsub">"Thanks for reaching out"</text>

        <line x1="378" y1="48" x2="436" y2="48" class="nflow" marker-end="url(#a1)"/>
        <rect x="436" y="20" width="120" height="56" rx="8" fill="#181D23" stroke="#3a4248" stroke-width="1"/>
        <text x="496" y="44" text-anchor="middle" class="nlabel">Wait 10 min</text>
        <text x="496" y="60" text-anchor="middle" class="nsub">Wait</text>

        <line x1="556" y1="48" x2="614" y2="48" class="nflow" marker-end="url(#a1)"/>
        <polygon points="614,48 654,20 694,48 654,76" fill="#181D23" stroke="#2A9D8F" stroke-width="1"/>
        <text x="654" y="44" text-anchor="middle" class="nlabel" font-size="11">Replied?</text>
        <text x="654" y="58" text-anchor="middle" class="ncond">If/Else</text>

        <line x1="694" y1="48" x2="752" y2="48" class="nflow" marker-end="url(#a1)"/>
        <text x="723" y="38" text-anchor="middle" class="ncond">No</text>
        <rect x="752" y="20" width="160" height="56" rx="8" fill="#181D23" stroke="#E07856" stroke-width="1"/>
        <text x="832" y="44" text-anchor="middle" class="nlabel">Notify Assigned User</text>
        <text x="832" y="60" text-anchor="middle" class="nsub">Call task created</text>

        <line x1="654" y1="76" x2="654" y2="150" class="nflow" marker-end="url(#a1)"/>
        <text x="672" y="115" class="ncond">Yes</text>
        <rect x="574" y="150" width="160" height="50" rx="8" fill="#181D23" stroke="#E8702A" stroke-width="1"/>
        <text x="654" y="172" text-anchor="middle" class="nlabel">Add Tag: Engaged</text>
        <text x="654" y="187" text-anchor="middle" class="nsub">Move to next stage</text>
      </svg>`
  },
  {
    id: "missed-call",
    label: "Missed Call Text Back",
    business: "TrueFix Home Services",
    problem: "Calls come in while techs are on-site or driving. A missed call with no callback is a lost job — most callers just dial the next company on the list.",
    solution: "Any missed call instantly triggers a text so the caller hears back within seconds, even if no one was free to pick up.",
    alt: "Workflow diagram: a missed call triggers an instant text back, creates an opportunity in the pipeline, and notifies the assigned user with a callback reminder.",
    svg: `
      <svg viewBox="0 0 980 160" xmlns="http://www.w3.org/2000/svg">
        <defs><marker id="a2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#8E99A4"/></marker></defs>
        <rect x="0" y="20" width="170" height="56" rx="8" fill="#181D23" stroke="#E8702A" stroke-width="1.2"/>
        <text x="85" y="44" text-anchor="middle" class="nlabel">Missed Call</text>
        <text x="85" y="60" text-anchor="middle" class="nsub">Trigger</text>

        <line x1="170" y1="48" x2="228" y2="48" class="nflow" marker-end="url(#a2)"/>
        <rect x="228" y="20" width="180" height="56" rx="8" fill="#181D23" stroke="#3a4248" stroke-width="1"/>
        <text x="318" y="44" text-anchor="middle" class="nlabel">Send SMS</text>
        <text x="318" y="60" text-anchor="middle" class="nsub">"Sorry we missed you, text us!"</text>

        <line x1="408" y1="48" x2="466" y2="48" class="nflow" marker-end="url(#a2)"/>
        <rect x="466" y="20" width="160" height="56" rx="8" fill="#181D23" stroke="#3a4248" stroke-width="1"/>
        <text x="546" y="44" text-anchor="middle" class="nlabel">Create Opportunity</text>
        <text x="546" y="60" text-anchor="middle" class="nsub">Add to Pipeline</text>

        <line x1="626" y1="48" x2="684" y2="48" class="nflow" marker-end="url(#a2)"/>
        <rect x="684" y="20" width="170" height="56" rx="8" fill="#181D23" stroke="#2A9D8F" stroke-width="1"/>
        <text x="769" y="44" text-anchor="middle" class="nlabel">Notify Assigned User</text>
        <text x="769" y="60" text-anchor="middle" class="nsub">Callback reminder</text>
      </svg>`
  },
  {
    id: "appt-reminders",
    label: "Appointment Reminders",
    business: "Bloom Dental Studio",
    problem: "No-shows eat into chair time. People forget appointments booked weeks ago, and a single missed slot is real revenue gone for the day.",
    solution: "Automated reminders fire at set intervals before the appointment, with a final same-day nudge that drops no-shows significantly.",
    alt: "Workflow diagram: booking an appointment triggers a reminder email 48 hours before, then a final SMS the morning of the appointment.",
    svg: `
      <svg viewBox="0 0 980 160" xmlns="http://www.w3.org/2000/svg">
        <defs><marker id="a3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#8E99A4"/></marker></defs>
        <rect x="0" y="20" width="170" height="56" rx="8" fill="#181D23" stroke="#E8702A" stroke-width="1.2"/>
        <text x="85" y="44" text-anchor="middle" class="nlabel">Appointment Booked</text>
        <text x="85" y="60" text-anchor="middle" class="nsub">Trigger</text>

        <line x1="170" y1="48" x2="228" y2="48" class="nflow" marker-end="url(#a3)"/>
        <rect x="228" y="20" width="150" height="56" rx="8" fill="#181D23" stroke="#3a4248" stroke-width="1"/>
        <text x="303" y="44" text-anchor="middle" class="nlabel">Wait Until</text>
        <text x="303" y="60" text-anchor="middle" class="nsub">48 hrs before</text>

        <line x1="378" y1="48" x2="436" y2="48" class="nflow" marker-end="url(#a3)"/>
        <rect x="436" y="20" width="150" height="56" rx="8" fill="#181D23" stroke="#3a4248" stroke-width="1"/>
        <text x="511" y="44" text-anchor="middle" class="nlabel">Send Email</text>
        <text x="511" y="60" text-anchor="middle" class="nsub">Reminder + details</text>

        <line x1="586" y1="48" x2="644" y2="48" class="nflow" marker-end="url(#a3)"/>
        <rect x="644" y="20" width="150" height="56" rx="8" fill="#181D23" stroke="#3a4248" stroke-width="1"/>
        <text x="719" y="44" text-anchor="middle" class="nlabel">Wait Until</text>
        <text x="719" y="60" text-anchor="middle" class="nsub">Morning of</text>

        <line x1="794" y1="48" x2="852" y2="48" class="nflow" marker-end="url(#a3)"/>
        <rect x="852" y="20" width="120" height="56" rx="8" fill="#181D23" stroke="#2A9D8F" stroke-width="1"/>
        <text x="912" y="44" text-anchor="middle" class="nlabel">Send SMS</text>
        <text x="912" y="60" text-anchor="middle" class="nsub">"See you today"</text>
      </svg>`
  },
  {
    id: "lead-nurture",
    label: "Lead Nurturing",
    business: "Elevate Online Coaching",
    problem: "Most leads aren't ready to buy the day they sign up, and a one-time welcome email is the last thing they ever hear from the brand.",
    solution: "A multi-day value sequence nurtures the lead automatically, with engagement tracked so sales only steps in once interest is shown.",
    alt: "Workflow diagram: a lead opt-in triggers a welcome email, a two-day wait, then a case-study email. If the lead clicks a link, the assigned user is notified of a hot lead for sales follow-up.",
    svg: `
      <svg viewBox="0 0 980 200" xmlns="http://www.w3.org/2000/svg">
        <defs><marker id="a4" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#8E99A4"/></marker></defs>
        <rect x="0" y="20" width="150" height="56" rx="8" fill="#181D23" stroke="#E8702A" stroke-width="1.2"/>
        <text x="75" y="44" text-anchor="middle" class="nlabel">Lead Opted In</text>
        <text x="75" y="60" text-anchor="middle" class="nsub">Trigger</text>

        <line x1="150" y1="48" x2="208" y2="48" class="nflow" marker-end="url(#a4)"/>
        <rect x="208" y="20" width="140" height="56" rx="8" fill="#181D23" stroke="#3a4248" stroke-width="1"/>
        <text x="278" y="44" text-anchor="middle" class="nlabel">Send Email 1</text>
        <text x="278" y="60" text-anchor="middle" class="nsub">Welcome + value</text>

        <line x1="348" y1="48" x2="406" y2="48" class="nflow" marker-end="url(#a4)"/>
        <rect x="406" y="20" width="110" height="56" rx="8" fill="#181D23" stroke="#3a4248" stroke-width="1"/>
        <text x="461" y="44" text-anchor="middle" class="nlabel">Wait 2 days</text>
        <text x="461" y="60" text-anchor="middle" class="nsub">Wait</text>

        <line x1="516" y1="48" x2="574" y2="48" class="nflow" marker-end="url(#a4)"/>
        <rect x="574" y="20" width="140" height="56" rx="8" fill="#181D23" stroke="#3a4248" stroke-width="1"/>
        <text x="644" y="44" text-anchor="middle" class="nlabel">Send Email 2</text>
        <text x="644" y="60" text-anchor="middle" class="nsub">Case study</text>

        <line x1="644" y1="76" x2="644" y2="150" class="nflow" marker-end="url(#a4)"/>
        <polygon points="644,150 684,122 724,150 684,178" fill="#181D23" stroke="#2A9D8F" stroke-width="1"/>
        <text x="684" y="146" text-anchor="middle" class="nlabel" font-size="10">Clicked link?</text>
        <text x="684" y="160" text-anchor="middle" class="ncond">If/Else</text>

        <line x1="724" y1="150" x2="782" y2="150" class="nflow" marker-end="url(#a4)"/>
        <text x="753" y="140" class="ncond">Yes</text>
        <rect x="782" y="122" width="180" height="56" rx="8" fill="#181D23" stroke="#E07856" stroke-width="1"/>
        <text x="872" y="146" text-anchor="middle" class="nlabel">Notify Assigned User</text>
        <text x="872" y="162" text-anchor="middle" class="nsub">Hot lead — sales follow-up</text>
      </svg>`
  },
  {
    id: "reactivation",
    label: "Customer Reactivation",
    business: "Glow Box Beauty Subscription",
    problem: "Customers quietly go inactive — no cancellation, just no orders. Without a system watching for it, that revenue disappears with no one noticing.",
    solution: "GHL flags any contact with no purchase in 60 days, sends a win-back offer, then tags churned contacts that don't respond so the list stays clean.",
    alt: "Workflow diagram: no purchase in 60 days triggers a win-back email and a five-day wait. Contacts who purchase are tagged Reactivated; contacts who don't are tagged Churned and removed from the active list.",
    svg: `
      <svg viewBox="0 0 980 200" xmlns="http://www.w3.org/2000/svg">
        <defs><marker id="a5" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#8E99A4"/></marker></defs>
        <rect x="0" y="20" width="180" height="56" rx="8" fill="#181D23" stroke="#E8702A" stroke-width="1.2"/>
        <text x="90" y="44" text-anchor="middle" class="nlabel">No Purchase 60 Days</text>
        <text x="90" y="60" text-anchor="middle" class="nsub">Trigger</text>

        <line x1="180" y1="48" x2="238" y2="48" class="nflow" marker-end="url(#a5)"/>
        <rect x="238" y="20" width="150" height="56" rx="8" fill="#181D23" stroke="#3a4248" stroke-width="1"/>
        <text x="313" y="44" text-anchor="middle" class="nlabel">Send Email</text>
        <text x="313" y="60" text-anchor="middle" class="nsub">"We miss you" + offer</text>

        <line x1="388" y1="48" x2="446" y2="48" class="nflow" marker-end="url(#a5)"/>
        <rect x="446" y="20" width="110" height="56" rx="8" fill="#181D23" stroke="#3a4248" stroke-width="1"/>
        <text x="501" y="44" text-anchor="middle" class="nlabel">Wait 5 days</text>
        <text x="501" y="60" text-anchor="middle" class="nsub">Wait</text>

        <line x1="501" y1="76" x2="501" y2="150" class="nflow" marker-end="url(#a5)"/>
        <polygon points="501,150 541,122 581,150 541,178" fill="#181D23" stroke="#2A9D8F" stroke-width="1"/>
        <text x="541" y="148" text-anchor="middle" class="nlabel" font-size="10">Purchased?</text>
        <text x="541" y="162" text-anchor="middle" class="ncond">If/Else</text>

        <line x1="461" y1="150" x2="403" y2="150" class="nflow" marker-end="url(#a5)"/>
        <text x="432" y="140" class="ncond">Yes</text>
        <rect x="243" y="122" width="160" height="56" rx="8" fill="#181D23" stroke="#E8702A" stroke-width="1"/>
        <text x="323" y="146" text-anchor="middle" class="nlabel">Add Tag: Reactivated</text>
        <text x="323" y="162" text-anchor="middle" class="nsub">Move to active list</text>

        <line x1="581" y1="150" x2="639" y2="150" class="nflow" marker-end="url(#a5)"/>
        <text x="610" y="140" class="ncond">No</text>
        <rect x="639" y="122" width="170" height="56" rx="8" fill="#181D23" stroke="#E07856" stroke-width="1"/>
        <text x="724" y="146" text-anchor="middle" class="nlabel">Add Tag: Churned</text>
        <text x="724" y="162" text-anchor="middle" class="nsub">Remove from active list</text>
      </svg>`
  },
  {
    id: "quote-followup",
    label: "Quote Follow-Up",
    business: "LaunchReady Marketing Agency",
    problem: "Quotes get sent but prospects go silent — no one follows up consistently, so deals slip through the cracks.",
    solution: "GHL automatically follows up 24 hours after a quote is sent via SMS, then again 48 hours later with an email that addresses objections. If accepted, the contact moves to onboarding.",
    alt: "Workflow diagram: a sent quote triggers a 24-hour wait, an SMS follow-up, then another 24-hour wait. If the quote is accepted, the contact's pipeline stage changes to Onboarding.",
    svg: `
      <svg viewBox="0 0 980 200" xmlns="http://www.w3.org/2000/svg">
        <defs><marker id="a6" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#8E99A4"/></marker></defs>
        <rect x="0" y="20" width="150" height="56" rx="8" fill="#181D23" stroke="#E8702A" stroke-width="1.2"/>
        <text x="75" y="44" text-anchor="middle" class="nlabel">Quote Sent</text>
        <text x="75" y="60" text-anchor="middle" class="nsub">Trigger</text>

        <line x1="150" y1="48" x2="208" y2="48" class="nflow" marker-end="url(#a6)"/>
        <rect x="208" y="20" width="120" height="56" rx="8" fill="#181D23" stroke="#3a4248" stroke-width="1"/>
        <text x="268" y="44" text-anchor="middle" class="nlabel">Wait 24 hrs</text>
        <text x="268" y="60" text-anchor="middle" class="nsub">Wait</text>

        <line x1="328" y1="48" x2="386" y2="48" class="nflow" marker-end="url(#a6)"/>
        <rect x="386" y="20" width="150" height="56" rx="8" fill="#181D23" stroke="#3a4248" stroke-width="1"/>
        <text x="461" y="44" text-anchor="middle" class="nlabel">Send SMS</text>
        <text x="461" y="60" text-anchor="middle" class="nsub">"Any questions on the quote?"</text>

        <line x1="536" y1="48" x2="594" y2="48" class="nflow" marker-end="url(#a6)"/>
        <rect x="594" y="20" width="120" height="56" rx="8" fill="#181D23" stroke="#3a4248" stroke-width="1"/>
        <text x="654" y="44" text-anchor="middle" class="nlabel">Wait 24 hrs</text>
        <text x="654" y="60" text-anchor="middle" class="nsub">Wait</text>

        <line x1="654" y1="76" x2="654" y2="150" class="nflow" marker-end="url(#a6)"/>
        <polygon points="654,150 694,122 734,150 694,178" fill="#181D23" stroke="#2A9D8F" stroke-width="1"/>
        <text x="694" y="148" text-anchor="middle" class="nlabel" font-size="10">Accepted?</text>
        <text x="694" y="162" text-anchor="middle" class="ncond">If/Else</text>

        <line x1="734" y1="150" x2="792" y2="150" class="nflow" marker-end="url(#a6)"/>
        <text x="763" y="140" class="ncond">Yes</text>
        <rect x="792" y="122" width="180" height="56" rx="8" fill="#181D23" stroke="#E8702A" stroke-width="1"/>
        <text x="882" y="146" text-anchor="middle" class="nlabel">Pipeline Stage Changed</text>
        <text x="882" y="162" text-anchor="middle" class="nsub">Move to Onboarding</text>

        <line x1="614" y1="178" x2="614" y2="200" class="nflow"/>
      </svg>`
  },
  {
    id: "onboarding",
    label: "Customer Onboarding",
    business: "PeakFit Personal Training Studio",
    problem: "New clients sign up excited, then go quiet in week one because no one set expectations on what happens next.",
    solution: "Once payment clears, a structured welcome sequence sends intake forms, schedules the first session, and checks in automatically — so nothing depends on someone remembering to follow up.",
    alt: "Workflow diagram: a received payment triggers a welcome email with an intake form, a booking link for the first session, a three-day wait, then an SMS check-in.",
    svg: `
      <svg viewBox="0 0 980 160" xmlns="http://www.w3.org/2000/svg">
        <defs><marker id="a7" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#8E99A4"/></marker></defs>
        <rect x="0" y="20" width="140" height="56" rx="8" fill="#181D23" stroke="#E8702A" stroke-width="1.2"/>
        <text x="70" y="44" text-anchor="middle" class="nlabel">Payment Received</text>
        <text x="70" y="60" text-anchor="middle" class="nsub">Trigger</text>

        <line x1="140" y1="48" x2="198" y2="48" class="nflow" marker-end="url(#a7)"/>
        <rect x="198" y="20" width="150" height="56" rx="8" fill="#181D23" stroke="#3a4248" stroke-width="1"/>
        <text x="273" y="44" text-anchor="middle" class="nlabel">Send Email</text>
        <text x="273" y="60" text-anchor="middle" class="nsub">Welcome + intake form</text>

        <line x1="348" y1="48" x2="406" y2="48" class="nflow" marker-end="url(#a7)"/>
        <rect x="406" y="20" width="150" height="56" rx="8" fill="#181D23" stroke="#3a4248" stroke-width="1"/>
        <text x="481" y="44" text-anchor="middle" class="nlabel">Send Booking Link</text>
        <text x="481" y="60" text-anchor="middle" class="nsub">First session</text>

        <line x1="556" y1="48" x2="614" y2="48" class="nflow" marker-end="url(#a7)"/>
        <rect x="614" y="20" width="120" height="56" rx="8" fill="#181D23" stroke="#3a4248" stroke-width="1"/>
        <text x="674" y="44" text-anchor="middle" class="nlabel">Wait 3 days</text>
        <text x="674" y="60" text-anchor="middle" class="nsub">Wait</text>

        <line x1="734" y1="48" x2="792" y2="48" class="nflow" marker-end="url(#a7)"/>
        <rect x="792" y="20" width="170" height="56" rx="8" fill="#181D23" stroke="#2A9D8F" stroke-width="1"/>
        <text x="877" y="44" text-anchor="middle" class="nlabel">Send SMS Check-In</text>
        <text x="877" y="60" text-anchor="middle" class="nsub">"How's it going so far?"</text>
      </svg>`
  },
  {
    id: "internal-notify",
    label: "Internal Notifications",
    business: "ClarityHR Consulting",
    problem: "Important events — a high-value lead, a cancelled appointment, a negative review — happen, but the team only finds out hours later by checking the dashboard manually.",
    solution: "Specific triggers route an instant alert to the right person on the team, so urgent situations get handled in minutes, not at the end of the day.",
    alt: "Workflow diagram: pipeline stage changes and cancelled appointments both feed a high-value check. High-value events send an urgent SMS to the assigned user, post to the team Slack channel, and add a priority follow-up tag.",
    svg: `
      <svg viewBox="0 0 980 200" xmlns="http://www.w3.org/2000/svg">
        <defs><marker id="a8" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#8E99A4"/></marker></defs>
        <rect x="0" y="20" width="160" height="56" rx="8" fill="#181D23" stroke="#E8702A" stroke-width="1.2"/>
        <text x="80" y="44" text-anchor="middle" class="nlabel">Pipeline Stage Changed</text>
        <text x="80" y="60" text-anchor="middle" class="nsub">Trigger</text>

        <rect x="0" y="120" width="160" height="56" rx="8" fill="#181D23" stroke="#E8702A" stroke-width="1.2"/>
        <text x="80" y="144" text-anchor="middle" class="nlabel">Appointment Cancelled</text>
        <text x="80" y="160" text-anchor="middle" class="nsub">Trigger</text>

        <line x1="160" y1="48" x2="200" y2="48" class="nflow"/>
        <line x1="200" y1="48" x2="200" y2="148" class="nflow"/>
        <line x1="160" y1="148" x2="200" y2="148" class="nflow"/>
        <line x1="200" y1="98" x2="258" y2="98" class="nflow" marker-end="url(#a8)"/>

        <polygon points="258,98 298,70 338,98 298,126" fill="#181D23" stroke="#2A9D8F" stroke-width="1"/>
        <text x="298" y="94" text-anchor="middle" class="nlabel" font-size="10">High value?</text>
        <text x="298" y="108" text-anchor="middle" class="ncond">If/Else</text>

        <line x1="338" y1="98" x2="396" y2="98" class="nflow" marker-end="url(#a8)"/>
        <text x="367" y="88" class="ncond">Yes</text>
        <rect x="396" y="70" width="170" height="56" rx="8" fill="#181D23" stroke="#E07856" stroke-width="1"/>
        <text x="481" y="94" text-anchor="middle" class="nlabel">Notify Assigned User</text>
        <text x="481" y="110" text-anchor="middle" class="nsub">SMS alert — urgent</text>

        <line x1="566" y1="98" x2="624" y2="98" class="nflow" marker-end="url(#a8)"/>
        <rect x="624" y="70" width="160" height="56" rx="8" fill="#181D23" stroke="#3a4248" stroke-width="1"/>
        <text x="704" y="94" text-anchor="middle" class="nlabel">Post to Slack</text>
        <text x="704" y="110" text-anchor="middle" class="nsub">Team channel</text>

        <line x1="784" y1="98" x2="842" y2="98" class="nflow" marker-end="url(#a8)"/>
        <rect x="842" y="70" width="138" height="56" rx="8" fill="#181D23" stroke="#3a4248" stroke-width="1"/>
        <text x="911" y="94" text-anchor="middle" class="nlabel">Add Tag</text>
        <text x="911" y="110" text-anchor="middle" class="nsub">Priority follow-up</text>
      </svg>`
  },
  {
    id: "sales-pipeline",
    label: "Sales Pipeline",
    business: "GHL-native pipeline structure",
    problem: "Deals exist across scattered spreadsheets and sticky notes, so no one can say with confidence what stage a deal is actually in, or what's stuck.",
    solution: "A structured pipeline moves contacts automatically as actions happen, with each stage triggering its own follow-up — and a clean Won/Lost split that closes the loop.",
    alt: "Workflow diagram: leads move through New Lead, Contacted, Qualified, and Proposal Sent stages, each with automated actions, ending in a Won or Lost decision. Won moves to onboarding; Lost is tagged for re-engagement in 90 days.",
    svg: `
      <svg viewBox="0 0 980 230" xmlns="http://www.w3.org/2000/svg">
        <defs><marker id="a9" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#8E99A4"/></marker></defs>

        <rect x="0" y="30" width="148" height="74" rx="8" fill="#181D23" stroke="#E8702A" stroke-width="1.2"/>
        <text x="74" y="54" text-anchor="middle" class="nlabel">New Lead</text>
        <text x="74" y="70" text-anchor="middle" class="nsub">Auto-tag: New</text>
        <text x="74" y="84" text-anchor="middle" class="nsub">Notify rep</text>

        <line x1="148" y1="67" x2="200" y2="67" class="nflow" marker-end="url(#a9)"/>
        <rect x="200" y="30" width="148" height="74" rx="8" fill="#181D23" stroke="#3a4248" stroke-width="1"/>
        <text x="274" y="54" text-anchor="middle" class="nlabel">Contacted</text>
        <text x="274" y="70" text-anchor="middle" class="nsub">Send SMS intro</text>
        <text x="274" y="84" text-anchor="middle" class="nsub">Wait 1 day</text>

        <line x1="348" y1="67" x2="400" y2="67" class="nflow" marker-end="url(#a9)"/>
        <rect x="400" y="30" width="148" height="74" rx="8" fill="#181D23" stroke="#3a4248" stroke-width="1"/>
        <text x="474" y="54" text-anchor="middle" class="nlabel">Qualified</text>
        <text x="474" y="70" text-anchor="middle" class="nsub">Send quote</text>
        <text x="474" y="84" text-anchor="middle" class="nsub">Notify rep</text>

        <line x1="548" y1="67" x2="600" y2="67" class="nflow" marker-end="url(#a9)"/>
        <rect x="600" y="30" width="148" height="74" rx="8" fill="#181D23" stroke="#3a4248" stroke-width="1"/>
        <text x="674" y="54" text-anchor="middle" class="nlabel">Proposal Sent</text>
        <text x="674" y="70" text-anchor="middle" class="nsub">Quote follow-up</text>
        <text x="674" y="84" text-anchor="middle" class="nsub">sequence starts</text>

        <line x1="674" y1="104" x2="674" y2="140" class="nflow" marker-end="url(#a9)"/>
        <polygon points="674,140 714,162 674,184 634,162" fill="#181D23" stroke="#2A9D8F" stroke-width="1"/>
        <text x="674" y="158" text-anchor="middle" class="nlabel" font-size="10">Decision</text>
        <text x="674" y="171" text-anchor="middle" class="ncond">If/Else</text>

        <line x1="714" y1="162" x2="772" y2="162" class="nflow" marker-end="url(#a9)"/>
        <text x="743" y="152" class="ncond">Won</text>
        <rect x="772" y="135" width="148" height="54" rx="8" fill="#181D23" stroke="#E8702A" stroke-width="1"/>
        <text x="846" y="157" text-anchor="middle" class="nlabel">Won</text>
        <text x="846" y="172" text-anchor="middle" class="nsub">Move to Onboarding</text>

        <line x1="634" y1="162" x2="576" y2="162" class="nflow" marker-end="url(#a9)"/>
        <text x="605" y="152" class="ncond">Lost</text>
        <rect x="428" y="135" width="148" height="54" rx="8" fill="#181D23" stroke="#E07856" stroke-width="1"/>
        <text x="502" y="157" text-anchor="middle" class="nlabel">Lost</text>
        <text x="502" y="172" text-anchor="middle" class="nsub">Add Tag: Re-engage in 90d</text>
      </svg>`
  }
];

// ===== Render tabs + panels (accessible tablist with roving focus) =====
(function(){
  const tabsEl = document.getElementById('wfTabs');
  const panelsEl = document.getElementById('wfPanels');
  if(!tabsEl || !panelsEl) return;

  const tabs = [];

  WORKFLOWS.forEach((wf, i)=>{
    const tab = document.createElement('button');
    tab.className = 'wf-tab' + (i===0 ? ' active' : '');
    tab.textContent = wf.label;
    tab.id = 'tab-' + wf.id;
    tab.dataset.target = wf.id;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', i===0 ? 'true' : 'false');
    tab.setAttribute('aria-controls', 'panel-' + wf.id);
    tab.tabIndex = i===0 ? 0 : -1;
    tabsEl.appendChild(tab);
    tabs.push(tab);

    const panel = document.createElement('div');
    panel.className = 'wf-panel' + (i===0 ? ' active' : '');
    panel.id = 'panel-' + wf.id;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', 'tab-' + wf.id);
    panel.tabIndex = 0;
    panel.innerHTML = `
      <div class="wf-card">
        <div class="wf-meta">
          <div class="wf-meta-item problem">
            <span class="lbl">Problem — ${wf.business}</span>
            <p>${wf.problem}</p>
          </div>
          <div class="wf-meta-item solution">
            <span class="lbl">Solution</span>
            <p>${wf.solution}</p>
          </div>
        </div>
        <div class="wf-diagram">${wf.svg}</div>
      </div>
    `;
    const svg = panel.querySelector('.wf-diagram svg');
    if(svg){
      svg.setAttribute('role', 'img');
      svg.setAttribute('aria-label', wf.alt || (wf.label + ' workflow diagram'));
    }
    panelsEl.appendChild(panel);
  });

  function activate(tab, moveFocus){
    tabs.forEach(t=>{
      const selected = t === tab;
      t.classList.toggle('active', selected);
      t.setAttribute('aria-selected', String(selected));
      t.tabIndex = selected ? 0 : -1;
    });
    panelsEl.querySelectorAll('.wf-panel').forEach(p=>p.classList.remove('active'));
    document.getElementById('panel-' + tab.dataset.target).classList.add('active');
    if(moveFocus) tab.focus();
  }

  tabsEl.addEventListener('click', (e)=>{
    const btn = e.target.closest('.wf-tab');
    if(btn) activate(btn, false);
  });

  tabsEl.addEventListener('keydown', (e)=>{
    const current = tabs.indexOf(document.activeElement);
    if(current === -1) return;
    let next = null;
    if(e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (current + 1) % tabs.length;
    else if(e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (current - 1 + tabs.length) % tabs.length;
    else if(e.key === 'Home') next = 0;
    else if(e.key === 'End') next = tabs.length - 1;
    if(next !== null){
      e.preventDefault();
      activate(tabs[next], true);
    }
  });
})();
