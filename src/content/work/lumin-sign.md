---
title: The biggest growth opportunity was sitting in the product next door
slug: lumin-sign
company: Lumin
period: 2024—2026
role: Product Owner, Lumin Sign
kicker: Product strategy & growth
meta1: 2024—2026
meta2: Lumin Sign
summary: How we turned an existing signing behaviour inside a high-traffic PDF editor into a secure signing workflow without forcing users into another product.
order: 1
published: true
status: Case study
---
## Impact

- **~3×** monthly channel volume within two months of launch
- **~2×** total product volume
- **3 squads** coordinated across product boundaries

## The problem wasn't conversion

For a long time, we treated one of our biggest growth problems as a conversion problem.

Lumin had a PDF editor used by more than a million people every week. Many of them were already signing documents inside it. Right next door was Lumin Sign, our product for creating secure, auditable electronic signatures.

Very few people crossed over.

The instinct was predictable: improve the handoff. Better prompts. Fewer steps. Make it easier for someone using the PDF editor to discover Lumin Sign and complete the journey there.

Eventually I realised we were optimising the wrong thing.

These users did not want another product.

They wanted one document signed properly.

## The demand was already there

The PDF editor already had a signature tool. It was widely used, but what it placed on the document was effectively an image annotation. Someone could download the PDF, open it in an editor and remove it.

Lumin Sign could produce something much stronger: a sealed document, backed by a certificate and an audit trail.

So we had two things sitting beside each other:

- a high-volume product where people were already trying to sign documents;
- a lower-volume product capable of doing the job properly.

The problem was the boundary between them.

Three numbers made that hard to ignore.

People using the PDF editor's signature annotation outnumbered the entire weekly user base of Lumin Sign by roughly three to one.

Only about a quarter of users who started the existing "sign securely" handoff into Lumin Sign finished it.

And most of those users were not trying to run a signing workflow. They had one document, usually no counterparty, and one task they wanted to complete.

Demand was not something we needed to manufacture.

It was already happening in the wrong place.

## I stopped trying to improve the funnel

The obvious product response was to optimise the handoff.

Reduce steps. Improve the copy. Explain why secure signing was better. Make the transition into Lumin Sign feel less disruptive.

Those changes might have improved conversion at the margin, but they preserved the underlying assumption: that success meant moving the user from one product into another.

I started from a different question:

**What if the user never had to enter Lumin Sign at all?**

If their goal was simply to finish with a trustworthy signed document, adopting another product was a tax we were charging them for getting that outcome.

So instead of improving the bridge, I proposed removing the need to cross it.

The PDF editor would remain the experience the user saw. In the background, the document would be handed to Lumin Sign, sealed using our certificate infrastructure, flattened so the signature could no longer be edited, stored as the secure version and returned to the user.

Lumin Sign would stop being a destination.

For this workflow, it would become infrastructure.

## The product idea was the easy part

Making that decision work meant solving problems across three squads that did not report to me.

The PDF team needed to hand over the document and its metadata.

The growth team owned the surface, messaging and experiment.

My team owned the signing service, certificate, storage and audit trail.

Three squads. Three backlogs. Three sets of priorities.

What eventually worked was packaging the work as one product proposal rather than asking each team separately for help.

I wrote the user problem, expected value, full journey, experiment design and each squad's responsibilities into the same proposal, then brought it into our fortnightly product meeting.

Once each team could see exactly what they owned and why the work mattered, it became much easier to have a real prioritisation conversation.

## Pricing created another boundary

There was another trap.

Make secure signing free forever and we risked cannibalising the paid signing product.

Put a paywall in front of the signing action and we would recreate the same problem we were trying to remove: interrupt someone in the middle of a task and ask them to make a purchase decision.

So we moved the commercial boundary.

During the initial trial window, the signing action remained uninterrupted. The user could complete the document first. The paywall sat at the point where they wanted to download the sealed version.

In this case, it made more sense to let people finish the job before asking them to pay for the sealed output.

## Even the audit trail had to change

One of the less visible problems was the completion certificate.

Our audit model assumed a conventional e-signature workflow: somebody sends a document, somebody receives it, actions occur in sequence and the certificate records what happened.

This flow had none of that.

One person had one document and performed one signing action.

We could have forced that interaction into the existing model and produced a technically valid but misleading record.

Instead, I mapped the lifecycle explicitly to this single-person workflow so that someone reading the certificate years later would see what actually happened rather than a fictional sender-recipient relationship created to satisfy the data model.

That sounds like a small implementation detail.

In a trust product, it is part of the product.

## What happened

The idea had been floating around since 2024, but we only started treating it as a serious product initiative in 2025.

From the first concrete proposal to launch took about three months.

Within roughly two months of launch, monthly volume from the channel had tripled.

Total volume across the product roughly doubled.

More importantly, it held. This was not a short-lived spike from a launch campaign or temporary experiment.

It was also the second time we had seen essentially the same growth mechanism work.

Two years earlier, making Lumin Sign available to the PDF editor's broader user base had created the first major step change in the product's history.

This time we went further: instead of improving distribution into Lumin Sign, we removed the product boundary from the workflow entirely.

Across the wider three-year period in which we worked on this distribution strategy, annual agreement volume grew by roughly nine times.

## The number I should have measured earlier

About eighteen months later, I analysed retention across the product.

The behaviour behind this huge source of volume — one person arriving to seal one document — retained at close to nothing by month six.

That should not have been surprising.

It was a task, not a habit.

A user with a recurring multi-party signing workflow has a reason to come back. Someone who needs to sign a document for themselves may not need the product again for months.

The volume was real. But different kinds of volume had very different long-term value.

I eventually argued that this self-signing behaviour should count for less than a third of a multi-party signing request in our prioritisation model.

It is a strange thing to do to the biggest number you have ever put on a chart.

But it changed how I think about product success.

At launch, I had instrumented the question:

**How much volume will this create?**

I had not instrumented the equally important question:

**What is that volume worth?**

Both were answerable from the beginning. I only built the measurement for the flattering one.

Now, before shipping something I expect to move a major metric, I try to write down a second question too:

**If this works exactly as intended, what might still make me regret it?**

That question has become almost as useful as defining success itself.
