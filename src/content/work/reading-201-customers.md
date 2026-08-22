---
title: Reading 201 customers before writing the roadmap
slug: reading-201-customers
company: Lumin
period: "2026"
role: Product Owner, Lumin Sign
kicker: Customer research & prioritisation
meta1: "2026"
meta2: Lumin Sign
summary: Quarter planning had turned into a list of features with advocates attached. Reading 201 customer accounts in depth replaced that with six named problems and a defensible case for what to fund.
order: 4
published: false
status: Draft
---
**Read 201 accounts, 126 in depth, and named six problem spaces · tested every pattern against industry, region and contract type before calling it a pattern · became the pre-read for the quarter**

Every quarter, the same argument. A list of features, each with someone senior behind it, and no shared description of who our customers actually were.

The parts existed. Sales knew which deals they lost and roughly why. Support knew the tickets. Analytics knew the funnel shape. Customer success knew the accounts at risk. None of it combined into an answer to a simple question: of the people who pay us and stay, what do they have in common, and what are they doing that the product does not support.

Without that, prioritisation defaults to whoever argues best in the room. I wanted the next quarter's argument to start from a description of reality that everyone had already read, so the debate could be about what to fund rather than about whether a problem was real.

Interviews were already scheduled for the following month. This was the work that came before them, and part of its job was to make sure we did not waste them asking obvious questions.

## Sorting by behaviour, not by what people paid

I read 201 accounts over a six-month activity window. 126 of them had full research notes: what the business does, who works there, what they send, how often, what completion looks like, what their file names tell you about their process.

I sorted them by behaviour rather than by what they paid, which turned out to matter more than any other decision in the analysis:

| Tier | Accounts | Total sends | Avg sends | Avg completion |
|---|---|---|---|---|
| Never paid, active | 75 | 1,289 | 17 | 76% |
| Came from the sibling product | 69 | 275 | 4 | 66% |
| Downgraded to free | 22 | 337 | 15 | 82% |
| Retained paid | 25 | 2,179 | 87 | 84% |
| Churned after activating | 10 | 124 | 12 | 89% |

The concentration is the first thing that jumps out. About 12% of the sample drove nearly half of all volume. Twenty-five businesses produced more than the other hundred and seventy-six combined.

The second thing is stranger. The accounts that churned had the **highest** completion rate in the set. People were not leaving because the product failed them. Something else was going on, and it took the pricing analysis to explain it.

Then the discipline that made the findings hold up. For every pattern I thought I saw, I tested it three ways: does this cluster by industry, by region, or by the type of contract being signed? Most candidate patterns failed at least one test, and the failures were informative:

- Silent seat-sharing appeared in every industry, every region and every contract type. That makes it a product-shape problem, not a segment problem, and it means you fix it once.
- Stop-start usage clustered precisely, and not by industry. It appeared in grant-funded organisations, seasonal businesses and project-based professional services. Three different industries, one shared property: their work arrives in waves. So the pattern is about *when* a customer works, not what they do.
- Language difficulty clustered by region and not at all by vertical, which told me it was a market-entry question rather than a product-quality one.

Running that test on everything is slow and it is the only reason I trust the six problem spaces that came out of it.

## Six shapes, not one list

The obvious output of research like this is a ranked list of features. It is what people expect and it is the easiest thing to write.

The data would not carry one list. What follows are six distinct shapes of unsolved problem, each defined in a sentence and backed by named accounts and numbers in the internal version.

**We retain individuals, not teams.** Nearly all paid subscriptions were single-seat, averaging about 1.3 seats per account. Seven of the twenty-five retained paid workspaces had unlicensed colleagues actively sending agreements inside them, in one case without the admin knowing. On the free side, seventy-two of the seventy-five active never-paid accounts were teams splitting a monthly allowance between colleagues. One organisation sent over a hundred agreements across seven free users, deliberately staying under the workspace limit. The product earned individual loyalty and had no mechanism for pulling in the person sitting next to them.

**Bursty usage does not fit a fixed monthly subscription.** A cluster of accounts cancelled, kept using the free tier, then re-subscribed when work picked up. One had done it four separate times, another three. They were not evaluating competitors. They were telling us through their own billing behaviour that a flat monthly fee did not match their working rhythm. This is what explained the churned tier's high completion rate: their departure was a pricing mismatch, not a product failure, and our retention reporting could not tell the difference.

**Completion depends on who is signing, not on our design.** This is the finding that changed committed work. We had one product-wide abandonment number and a feature already scoped to fix it. Reading the accounts, that number was three unrelated populations. Signers who cannot proceed with their life until they sign, such as employees who need the document processed to get paid, or a property transaction that cannot close, completed at or near a hundred per cent. Signers with no consequence for delay ran far lower. Signers who did not understand what they had been sent, including elderly recipients and parents receiving school paperwork, ran lowest of all, in some accounts below a third. One reminder feature would have improved the first group, which needed the least help, and done nothing for the other two.

**Grassroots adoption never meets procurement.** Twenty-four accounts sat inside organisations of genuine scale: national and multinational employers, large school districts, municipal government, a global pharmaceutical business. In each one, employees were using the product for real regulated work, and nobody at our end had ever spoken to a decision-maker. The concentration was in sectors where an employee is required by regulation to sign a specific document, so the need was durable and not going away. This was not a research question. It was a pipeline that had never been worked.

**Customers stitch multi-document workflows together by hand.** The product served one agreement well. Real work arrived in sequences of three to eight linked documents: a quote then a contract then a manufacturing authorisation then variations; a property closing with six documents per matter; a contractor hire needing three separate agreements; one account onboarding three staff with eighteen documents in a single day. You can see it in their file names before you ever interview them, because they have invented their own case-numbering conventions to hold the sequence together. These were simultaneously our highest-value customers and the ones most likely to leave for a competitor with workflow features. The best customers were the closest to the exit.

**Language is a barrier nobody had logged.** Our single highest-volume customer in the sample ran hundreds of Spanish-language employment contracts through an English interface. Others ran Polish civil-law contracts and bilingual French and English property work. The product worked in those languages in spite of the interface, not because of it, and customers tolerated it because nothing better was aimed at them. No major competitor in our category was targeting Spanish-language small business specifically.

## Why I did not rank them against each other

The second temptation, after the ranked feature list, was to treat the six as competing priorities and force a ranking.

The six problems were different kinds of thing: one was a pricing mismatch, one was an unworked sales pipeline, one was a missing product primitive, one was a market-entry question. Ranking them against each other would mean pretending they were comparable, and the ranking would have buried the reasoning that made each one credible. Collapsing them is exactly how you end up serving none of them well while reporting progress on all of them.

The third temptation was to make everything conditional on the interviews scheduled for the following month. That would have been defensible and it would have cost a quarter. Some of these findings were already past the point where another conversation would change the decision.

## What went straight to scope, and what needed more thought

Instead I split the six by whether more research would actually change what we do.

**Three went straight to scope.** A pricing experiment for the stop-start customers, on the basis that people who have cancelled and returned four times have already told us what they need. A sales list of the large organisations with existing internal usage, handed over with the same opening line for all of them: this many of your people already use it, here is what for, would you like to see what an organisational agreement looks like. And workspace visibility for admins, because several of them did not know who was sending on their account.

**Three got structured as opportunity solution trees**, where the right answer genuinely was not obvious. For the completion problem, that meant writing the desired outcome as a number, listing the three signer populations as distinct opportunities, sketching solutions per population rather than per feature, and sequencing the experiments cheapest first. The cheapest test was a copy change aimed at the largest population, which would tell us whether consequence framing moved discretionary signers before we invested in anything structural.

**And an explicit list of what we were not doing.** The adjacent market we are repeatedly told to enter appeared in seven of two hundred and one accounts, so it stayed out. No vertical was concentrated enough to justify building for it, so the direction stayed horizontal. That list did more work in the meeting than most of the recommendations, because it pre-empted the arguments that usually consume the first half hour.

## The question I left for someone else to answer

One finding sat above the roadmap. Customers were operating a four-stage lifecycle: draft the document, negotiate it, sign it, then keep it for whoever needs it next. We served the third stage. The fourth stage, where signed agreements get retrieved for an audit, a dispute, a renewal or a compliance filing, was unowned by anyone, including us, and it was exactly where the compliance-heavy customers with the best retention spent time the product did not help with. Every one of them filed our output somewhere else the moment it was signed.

That raises a real strategic question: are we a signing tool, or the execution layer of something broader. I wrote the evidence, said which way I read it, and left the decision with the leadership team, because the resourcing implications were theirs and not mine. Naming a question clearly and not answering it is sometimes the more useful contribution, and it is a distinction I had to learn.

## What happened, and what I would change

It became the pre-read for the quarter, which changed the shape of the conversation. Arguments moved from whether a problem was real to which problem to fund. The committed signer work got rescoped by population instead of shipping as one generic reminder. The large-organisation accounts moved from an analysis into a sales list. The pricing pattern got a name, which meant our reporting stopped counting a recoverable customer as a lost one.

Two things I would do differently.

I had been interviewing senders for two years. Only a small fraction of people who receive a document ever go on to send one, which means the large majority of everyone who touches this product had never been asked anything at all. That is not a gap in a research plan. That is most of the top of the funnel, unexamined, while I refined my questions for the people who were already converted.

And I should have separated pricing mismatch from churn far earlier. Customers cancelling between busy periods had been counted as lost for months. The dashboard was accurate about the billing event and wrong about what it meant, and I had been reading it as uncritically as everyone else. Now, when a metric looks stable and boring, my first question is how many different things it is adding together.
