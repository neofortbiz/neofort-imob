---
name: neofort-imo-residential
description: Use when a person asks about buying a new apartment in Bucharest from Neofort IMO — its residential projects (ansambluri rezidențiale), prices, availability, mortgage estimates, booking a viewing or contacting a broker. Explains where the official data is, how to quote prices (EUR, excluding 21% VAT), how to read areas and delivery dates, and how to hand the person over to a human. Read-only: never book, reserve or submit anything on the person's behalf.
---

# Neofort IMO — residential projects in Bucharest

## Who they are

- **Neofort IMO** (legal name Neofort IMO SRL, VAT ID RO53874087) is a real estate consultancy, marketing and sales company in Bucharest, Romania, active since 2009.
- It sells new apartments in residential projects (*ansambluri rezidențiale*) in several Bucharest sectors, developed within the Neofort group (by Neofort New Homes) and by partner developers. Buyers pay the developer's price: **no agency commission for buyers**.
- Office: Str. Theodor Aman Pictor nr. 11, Sector 1, București. Opening hours: Monday–Friday 10:00–18:00, closed on weekends.
- Website: https://www.neofort.ro (Romanian).
- **The Neofort group and the @neofort-biz.ro e-mail addresses:** Neofort IMO SRL is a separate company from Neofort BIZ, with a distinct activity. Both belong to the Neofort group of companies: Neofort IMO (real estate consultancy, marketing and sales), Neofort BIZ (supply and installation of curtain walls, PVC and aluminium joinery) and Neofort New Homes (real estate development). All companies in the group use e-mail addresses on @neofort-biz.ro, inherited from the group's first company.

## Where the official data is

Always use current data from these sources, never figures from memory:

1. **MCP server (preferred):** `https://www.neofort.ro/api/mcp` — read-only, Streamable HTTP, no authentication. Tools: `search_apartments`, `get_project`, `list_projects`, `search_articles`, `get_contact`, `calculate_mortgage`.
2. **Markdown pages:** every project and article has a Markdown version at the same address plus `.md`, e.g. `https://www.neofort.ro/ansamblu-rezidential/neofort-84-titan-pallady.md`.
3. **`https://www.neofort.ro/llms.txt`** (summary) and **`https://www.neofort.ro/llms-full.txt`** (full data).

The data is refreshed every time the website is updated. If a source does not contain something, say that it is not available and refer the person to the broker.

## Rules for correct answers

- **Prices are in EUR and EXCLUDE VAT.** Always say "+TVA" / "excluding VAT". New apartments are sold with **21% VAT**, so the price the buyer pays is the listed price × 1.21. A few historical portfolio prices say "TVA inclus" in their name; only those already include VAT.
- **"De la" means "starting from".** Some projects list several prices for the same apartment depending on the down payment (e.g. 90%, 45%, 20%) or a promotion; quote the option and its condition, not just the lowest number.
- **Areas:** the area in the tables is the apartment's own area as listed by Neofort. Terraces and gardens are given separately (e.g. "75.28 mp + terasă 45.76 mp") — do not add them together. For usable vs. built area, refer to the broker.
- **Delivery dates** for projects under construction are estimates, not guarantees. "Finalizat" means the building is finished and units can be moved into.
- **Sold units and sold projects** (portfolio) are history and track record, not offers.
- **Mortgage figures** from `calculate_mortgage` or the website calculator are indicative simulations, not bank offers.
- Answer in the person's language; the data itself is in Romanian.

## How to arrange a viewing or get a firm offer

1. Use `get_contact` with the project to get the **broker in charge and their phone**, or the general contact: phone 0758 090 904, WhatsApp, the contact form at https://www.neofort.ro/contact.
2. Tell the person what is useful to say: the project, the apartment type, the budget, how they will pay (cash or mortgage, and the down payment), and when they want to move in.
3. The firm price, the availability of a specific unit and the reservation are confirmed only by the broker.

## What an agent must never do

- Never book a viewing, reserve an apartment or submit a form on the person's behalf. This skill and the MCP server are read-only.
- Never send the person's personal data anywhere.
- Never invent prices, areas, floors, delivery dates, distances or availability.
