<template>
  <div class="body">
    <div class="page">
      <div class="title">
        <div>[Ebuyhouse.com™]</div>
        <div>Real Property Purchase & Sale Agreement</div>
        <div>(and Escrow/Title Instructions)</div>
      </div>
      <div class="section">
        <label class="title">
          <span class="ol">1.</span>
          <span class="underline">Purchase/Sale.</span>
        </label>
        <span>
          By signing this Agreement, the “
          <span class="italic">Buyer</span>”(identified in the signature block below)
          is offering to purchase the Property defined in Section 2. (Buyer’s offer expires at 5:00 p.m. Pacific time
          on the date [3] Business Days after Buyer signs this Agreement.) By countersigning this Agreement, the
          “
          <span class="italic">Seller</span>”agrees to accept Buyer’s offer, thereby creating a
          <span
            class="uppercase"
          >binding, enforceable contract</span> among the two parties (this
          “
          <span class="italic">Agreement</span>”).
        </span>
      </div>
      <div class="section">
        <label class="title">
          <span class="ol">2.</span>
          <span class="underline">Real Property & Fixtures.</span>
        </label>
        <div class="ol-two">
          <span>(a)</span>
          <span>
            This purchase/sale transaction involves the following real property (the
            “
            <span class="italic">Property</span>”):
          </span>
        </div>
        <div class="fill-item">
          <div class="fill-item-left">Assessor Parcel # (APN):</div>
          <div class="fill-item-right">{{OfferInfo.parcel}}</div>
        </div>
        <div class="fill-item">
          <div class="fill-item-left">Street Address:</div>
          <div class="fill-item-right">{{OfferInfo.houses_address}}</div>
        </div>
        <div class="clear"></div>
        <div class="ol-two">
          <span>(b)</span>
          <span>
            The term “Property”
            <span class="underline">includes</span> all major appliances and fixtures currently located at the Property
            (e.g., lighting, electrical/mechanical fixtures, solar power systems, attached floor coverings, water heater, water softener, water purifier, doors, screen-
            doors, ceiling fans, window treatments, window shutters, awnings, AC/heating units, toilet/plumbing fixtures, fireplaces, gas logs/grates,
            TV antennas/satellite dishes/cable fixtures, built-in appliances, garage-door and opener, security systems/alarms,
            pool/spa equipment, in-ground landscaping/trees/shrubs, stove, washer/dryer, refrigerator/freezer, microwave oven, etc.),
            warranties, and warranty claims, except for items listed by Seller here:
            <div class="station-underline" style="display: block">&nbsp;</div>
          </span>
        </div>
        <div class="ol-two">
          <span>(c)</span>
          <span>If any item above is (1) leased instead of owned, or (2) owned but liened to a third party, Seller shall notify Buyer of those details within [5] Business Days after the Effective Date.</span>
        </div>
        <div class="ol-two">
          <span>(d)</span>
          <span>By clicking below, Buyer confirms whether (or not) it intends to occupy the Property as its residence post-Closing:</span>
        </div>
        <div class="fill-checkbox">Yes, Buyer will reside in the Property post-Closing:
          <input type="checkbox" disabled>
        </div>
        <div class="fill-checkbox">No, Buyer won’t reside in the Property post-Closing:
          <input type="checkbox" checked disabled>
        </div>
      </div>
      <div class="section">
        <label class="title">
          <span class="ol">3.</span>
          <span class="underline">Date.</span>
        </label>
        <span>The date of this Agreement (the “
          <span class="italic">Effective Date</span>”) is the date this is signed by both Buyer and Seller.
        </span>
      </div>
      <div class="section">
        <label class="title">
          <span class="ol">4.</span>
          <span class="underline">Purchase Price.</span>
        </label>
        <span>The “
          <span class="italic">Purchase Price</span>” for the purchase/sale transaction (excluding closing costs and prorations) is:
        </span>
        <div class="fill-item">
          <div class="fill-item-left" style="width: 8%">USD&nbsp;$</div>
          <div class="fill-item-right" style="width: 92%">{{OfferInfo.price}}</div>
        </div>
        <div class="clear"></div>
      </div>
      <div class="section">
        <label class="title">
          <span class="ol">5.</span>
          <span class="underline">Trial Period.</span>
        </label>
        <span>. By clicking here, Seller agrees (or does not agree) that between the Effective Date and Closing (the “
          <span class="italic">Trial Period</span>”), Buyer may reside in the Property on a trial basis:
        </span>
        <div class="fill-checkbox">Yes, Seller agrees to a Trial Period:
          <input type="checkbox" :checked="OfferInfo.try_time_day !== 0 ? true : false" disabled>
        </div>
        <div class="fill-checkbox">No, Buyer won’t reside in the Property post-Closing:
          <input type="checkbox" :checked="OfferInfo.try_time_day === 0 ? true : false" disabled>
        </div>
        <span>If Seller is offering the Buyer a Trial Period, by clicking here, Buyer confirms whether or not it desires a Trial Period:</span>
        <div class="fill-checkbox">Yes, Buyer wants a Trial Period: 󠆶
          <input type="checkbox" :checked="OfferInfo.try_time_day !== 0 ? true : false" disabled>
        </div>
        <div class="fill-checkbox">No, Buyer does not want a Trial Period:
          <input type="checkbox" :checked="OfferInfo.try_time_day === 0 ? true : false" disabled>
        </div>
        <span>
          If Buyer clicks “yes,” then the following applies. Seller will provide the keys/codes to Buyer within [3]
          Business Days after the Effective Date. During the Trial Period, only Buyer and its immediate family members may
          stay overnight. No pets are permitted. Buyer may not make any material alterations to the Property. Buyer must obey all (i)
          laws (including not creating a nuisance) and (ii) written rules/regulations of Seller and any HOA. Buyer may not cause any
          lien/encumbrance to be placed on the Property. Seller is not responsible for any injury, death, loss, or damage to Buyer,
          its guests, or their property in relation to their entry on or use of the Property. Buyer is strongly encouraged to buy
          insurance covering all such risks (which risks it voluntarily assumes). Buyer hereby agrees to indemnify,
          defend, and hold Seller harmless from all damages, losses, claims and other liabilities relating to its entry on or use of the Property
          (unless caused by Seller). During the Trial Period, Seller may still enter the Property (with reasonable notice)
        </span>
      </div>
    </div>
    <div class="page">
      <div class="section" style="text-indent: 0">
        <span>
          to ensure Buyer’s compliance with these duties. If the Closing does not occur for any reason except Seller’s breach,
          (1) Buyer must immediately return the keys/codes to Seller and (2) Seller is entitled to the
          Administrative Fee set forth in Section 10(d). Buyer’s possession changes the risk of loss to the Property under Section 17(a).
        </span>
      </div>
      <div class="section">
        <label class="title">
          <span class="ol">6.</span>
          <span class="underline">Buyer’s Financing.</span>
        </label>
        <span>Buyer’s offer is
          <span class="underline">not</span> contingent on financing, and there is no Seller financing for this purchase/sale. By clicking below, Buyer confirms that:
        </span>
        <div
          class="fill-checkbox"
        >Buyer intends to pay the Purchase Price in cash, in full, at Closing: 󠆶
          <input type="checkbox" :checked="OfferInfo.pay_mode == 1 ? true : false" disabled>
        </div>
        <div
          class="fill-checkbox"
        >Buyer has obtained pre-approval/pre-qualification (in the Purchase Price amount or more) from a mortgage lender to purchase the Property.
          <input type="checkbox" :checked="OfferInfo.pay_mode == 2 ? true : false" disabled>
        </div>
        <span>
          Within [3] Business Days after the Effective Date, Buyer must deliver to Seller and Escrow Agent reasonable proof of either having sufficient cash on hand or of its lender’s pre-approval.
          If Buyer does not timely provide that proof, Escrow Agent shall notify the parties and this Agreement will automatically terminate.
        </span>
      </div>
      <div class="section">
        <label class="title">
          <span class="ol">7.</span>
          <span class="underline">Appraisal Contingency.</span>
        </label>
        <span>If Buyer (or its lender) requires an appraisal, Buyer shall obtain one during the Due Diligence Period at its own cost/expense. If the appraisal is less than the Purchase Price, either the purchase/sale will continue (to Closing) if Buyer agrees to pay any shortfall its lender may otherwise withhold, or Buyer may terminate this Agreement during the Due Diligence Period (pursuant to Section 10).</span>
      </div>
      <div class="section">
        <label class="title">
          <span class="ol">8.</span>
          <span class="underline">Escrow; Deposit.</span>
        </label>
        <span>Within [3] Business Days after the Effective Date, Buyer must deposit [10%] of the Purchase Price—i.e.,</span>
        <div class="fill-item">
          <div class="fill-item-left" style="width: 8%">USD&nbsp;$</div>
          <div class="fill-item-right" style="width: 92%">{{OfferInfo.advance_money}}</div>
        </div>
        <div class="clear"></div>
        <span>(the “
          <span class="italic">Deposit</span>”)—with the following neutral/independent “
          <span class="italic">Escrow Agent</span>” and “
          <span class="italic">Title Company</span>”
        </span>
        <span class="station-underline" style="display: block">{{OfferInfo.escrow_company}}</span>
        <span>Escrow Agent shall notify the parties when it receives the Deposit, and place those funds in a [non-]interest-bearing account with an insured bank. If Buyer does not timely make the Deposit (or its check is dishonored), Escrow Agent shall notify the parties and this Agreement will automatically terminate.</span>
      </div>
      <div class="section">
        <label class="title">
          <span class="ol">9.</span>
          <span class="underline">Title Policy.</span>
        </label>
        <span>Within [3] Business Days after the Effective Date, the Title Company will provide the parties with a “
          <span class="italic">Commitment.</span>” A commitment is an offer by the Title Company to provide Buyer with an “ALTA-Residential” title insurance policy (the “
          <span class="italic">Title Policy</span>”) at Closing, insuring Buyer’s status as fee owner of the Property subject only to Permitted Exceptions. By that same deadline, the Title Company shall provide the underlying documents for the exceptions in the Commitment. Buyer must review the Commitment and notify Seller, at least [3] Business Days before the end of the Due Diligence Period, if it objects to a title com.edan.new_project.exception in the Commitment. If Buyer does not give such notice, all exceptions shall constitute “
          <span class="italic">Permitted Exceptions.</span>” If Buyer objects, Seller may choose to cure the relevant com.edan.new_project.exception or terminate this Agreement. Seller shall not permit any additional exceptions to arise after the Effective Date, but if an com.edan.new_project.exception arises, Buyer shall have [3] days (from receiving notice thereof) to object (with the Closing being postponed, if need be, to allow for that full period), or else that com.edan.new_project.exception shall be a Permitted Exception. In such situation, Seller may again choose to cure or terminate.
        </span>
      </div>
      <div class="section">
        <label class="title">
          <span class="ol">10.</span>
          <span class="underline">Real Property & Fixtures.</span>
        </label>
        <div class="ol-two">
          <span>(a)</span>
          <span>Buyer has a period of [15] Business Days from the Effective Date (the “
            <span class="italic">Due Diligence Period</span>”) to inspect, study, appraise, and investigate the Property. In such investigations, Buyer may not cause any lien/encumbrance to be placed on the Property, and Buyer shall indemnify Seller for all damages, losses, claims and liabilities relating to such activities (unless caused by Seller). Buyer may not perform any “invasive” or destructive drilling or other tests unless: (1) Buyer obtains Seller’s prior written consent; (2) Buyer obeys all laws; (3) Buyer uses licensed and bonded contractors; and (4) afterwards, Buyer restores the Property to its pre-testing condition.
          </span>
        </div>
        <div class="ol-two">
          <span>(b)</span>
          <span>Buyer’s investigations are important because it is buying the Property on an “as is/where is” basis. Once the transaction Closes, Buyer is solely responsible for all defects. Unless set forth herein, Seller is not providing any warranties of fitness, merchantability, or habitability, nor any other representation or warranty regarding the Property, including as to title, defects, zoning, usage, licensing/permitting, code compliance, lot- and building-size, drainage,</span>
        </div>
      </div>
    </div>
    <div class="page">
      <div class="section">
        <div class="ol-two" style="text-indent: 0">
          <span>flood risk, seismic/earthquake risk, structural/roofing issues, utilities, access/sidewalks/roads, noises/odors, environmental matters, underground storage tanks, pests, health/fire safety-systems, crime statistics, sexual predators, airplane/airport noise, school availability, and recorded documents and liens (e.g., CC&Rs, declarations, and easements). Any materials or information provided by Seller to Buyer should not be presumed to be accurate or complete. Seller is not guaranteeing that the Property is defect-free. Buyer must rely solely on its own investigation of the Property, and has a duty to protect itself by conducting a reasonable investigation. Seller encourages Buyer to hire a home inspector.</span>
        </div>
        <div class="ol-two">
          <span>(c)</span>
          <span>During the Due Diligence Period, Seller will maintain the Property in substantially the same condition as on the Effective Date, and provide Buyer with reasonable access/walk-throughs for Buyer’s investigations.</span>
        </div>
        <div class="ol-two">
          <span>(d)</span>
          <span>If, during the Due Diligence Period, Buyer objects to a certain defect/condition, it may notify Seller. Seller may fix that issue, but has no duty to do so. If, during or at the end of the Due Diligence Period, Buyer is not satisfied for any reason, it may cancel/terminate this Agreement by notifying Seller and Escrow Agent. If Buyer terminates, Escrow Agent shall refund the full Deposit to Buyer (less a [3]% “
            <span class="italic">Administration Fee</span>” to cover utilities, cleaning costs, etc., if a Trial Period was offered and taken). If Buyer does not terminate, the full Deposit shall be applied to the Purchase Price at Closing.
          </span>
        </div>
        <div class="ol-two">
          <span>(e)</span>
          <span>Buyer is encouraged to obtain home insurance that goes into effect immediately at Closing. Seller’s policy will likely be canceled at that time.</span>
        </div>
      </div>
      <div class="section">
        <label class="title">
          <span class="ol">11.</span>
          <span class="underline">Closing; Deliveries.</span>
        </label>
        <div class="ol-two">
          <span>(a)</span>
          <span>If Buyer does not terminate, the purchase/sale shall close on the [5th] Business Day following the Due Diligence Period (or a different date, if agreed by the parties). That “
            <span class="italic">Closing</span>” will be at Escrow Agent’s office. In this Agreement, a “
            <span class="italic">Business Day</span>” means any day except a Saturday, Sunday, or U.S. or Nevada bank holiday.
          </span>
        </div>
        <div class="ol-two">
          <span>(b)</span>
          <span>Prior to and during that 5 Business Day period, Escrow Agent shall notify the parties about the reasonable and customary documents and materials required from them—e.g., a grant bargain and sale deed (the “
            <span class="italic">Deed</span>”), declaration of value, FIRPTA affidavit, Closing Statements, keys, codes, etc. Each party must promptly deliver its signed documents, forms, materials, and money to Escrow Agent at least 24 hours prior to Closing.
          </span>
        </div>
        <div class="ol-two">
          <span>(c)</span>
          <span>At Closing, the Escrow Holder shall “close escrow” by: (1) recording any deed of trust/mortgage reconveyances; (2) applying the Purchase Price pursuant to the Closing Statements; and (3) recording the Deed and any deed of trust/mortgage. On the Closing date, Seller shall give Buyer possession of the Property in a reasonable, “broom-clean” condition (unless already provided for the Trial Period). On the Closing date, Seller must have completed any mutually-agreed repairs. Any personal property left by Seller shall be deemed abandoned and may be sold/discarded/kept by Buyer. The Title Company constitutes the Reporting Person (as defined in the I.R.S. Code, §6045(e)).</span>
        </div>
        <div class="ol-two">
          <span>(d)</span>
          <span>If Seller cannot or does not provide a FIRPTA affidavit, then Escrow Holder may cause the withholdings required by applicable law.</span>
        </div>
      </div>
      <div class="section">
        <label class="title">
          <span class="ol">12.</span>
          <span class="underline">Closing Costs; Prorations.</span>
        </label>
        <div class="ol-two">
          <span>(a)</span>
          <span>Buyer and Seller shall equally pay (50/50): escrow fees. Seller shall solely pay: (1) real property transfer taxes (RPTT); (2) Deed-recording fees; (3) the cost of a CLTA Title Policy; and (4) its own advisors’ fees. Buyer shall solely pay: (i) title endorsements or Title Policy upgrades (e.g., a survey); (ii) costs relating to Buyer’s lender (e.g., recording of a deed of trust/mortgage, a lender’s title policy); (iii) any home warranty plan applying post-Closing; and (iv) its own advisors’ fees. However, if the Closing does not occur due to a party’s breach, then the breaching party is solely responsible for all escrow, title, and related fees and costs.</span>
        </div>
        <div class="ol-two">
          <span>(b)</span>
          <span>Escrow Holder will calculate and administer the following pro-rations at the Closing: (1) property taxes and assessments; (2) utility charges; (3) HOA, improvement-district (SIDS/LIDS), and similar dues and charges; (4) rental income; and (5) other customarily-pro-rated fees and charges. Prorations shall be calculated on a 30-day month and</span>
        </div>
      </div>
    </div>
    <div class="page">
      <div class="section">
        <div class="ol-two" style="text-indent: 0">
          <span>360-day year. Seller will keep all proration obligations current through the Closing (or the delinquency shall be deducted from any amounts paid to it). Any lease security deposits held by Seller shall be given to Buyer as a credit to the Closing payment required from Buyer.</span>
        </div>
      </div>
      <div class="section">
        <label class="title">
          <span class="ol">13.</span>
          <span class="underline">Limited Representations/Warranties.</span>
        </label>As of the Effective Date and at Closing:
        <div class="ol-two">
          <span>(a)</span>
          <span>Buyer and Seller shall equally pay (50/50): escrow fees. Seller shall solely pay: (1) real property transfer taxes (RPTT); (2) Deed-recording fees; (3) the cost of a CLTA Title Policy; and (4) its own advisors’ fees. Buyer shall solely pay: (i) title endorsements or Title Policy upgrades (e.g., a survey); (ii) costs relating to Buyer’s lender (e.g., recording of a deed of trust/mortgage, a lender’s title policy); (iii) any home warranty plan applying post-Closing; and (iv) its own advisors’ fees. However, if the Closing does not occur due to a party’s breach, then the breaching party is solely responsible for all escrow, title, and related fees and costs.</span>
        </div>
        <div class="ol-two">
          <span>(b)</span>
          <span>Each party represents/warrants that it has taken all necessary action to authorize, sign, deliver, and perform this Agreement. Neither party has any actual knowledge of any (1) conflict between this Agreement and its other contractual obligations, or any laws, or (2) actual/threatened litigation which might interfere with this purchase/sale. Neither party is insolvent or contemplating filing bankruptcy. Neither party is listed on any state or federal list of persons/entities engaged in terrorist activities or subject to an embargo, sanctions, or similar action..</span>
        </div>
      </div>
      <div class="section">
        <label class="title">
          <span class="ol">14.</span>
          <span class="underline">Defaults</span>
        </label>
        <span>If Seller defaults on this Agreement, Buyer reserves all rights in law and equity, including specific performance. If Buyer defaults on this Agreement, Seller’s only remedy is to (1) keep the full Deposit as its reasonable liquidated damages (because actual damages would otherwise be difficult to estimate); and (2) terminate this Agreement.</span>
      </div>
      <div class="section">
        <label class="title">
          <span class="ol">15.</span>
          <span class="underline">Mandatory Disclosures.</span>
        </label>
        <span>Each party has read (in full) all mandatory U.S. and Nevada disclosures visible at the following</span>
        <div class="fill-item">
          <div class="fill-item-left" style="width: 8%">link:</div>
          <div class="fill-item-right" style="width: 92%">&nbsp;</div>
        </div>
        <div class="clear"></div>
        <div class="fill-checkbox">Seller’s Confirmation:
          <input type="checkbox" checked disabled>
        </div>
        <div class="fill-checkbox">Buyer’s Confirmation:
          <input type="checkbox" checked disabled>
        </div>
      </div>
      <div class="section">
        <label class="title">
          <span class="ol">16.</span>
          <span class="underline">Brokers.</span>
        </label>
        <div class="ol-two">
          <span>(a)</span>
          <span>Each party confirms it has not dealt with any broker (or other intermediary) having a right to a commission/fee in connection with this purchase/sale. Each party hereby agrees to indemnify, defend, and hold the other party harmless from all damages, losses, claims and liabilities relating to the indemnifying party’s dealings with any broker. No broker may sign this Agreement on behalf of a party.</span>
        </div>
        <div class="ol-two">
          <span>(b)</span>
          <span>[Ebuyhouse.com™] is not a licensed real estate broker, salesperson, or agent. By facilitating this purchase/sale through its online platform, it is providing software/technology and a means for direct, consumer-to-consumer communications—not acting as a broker. If a party asks Ebuyhouse.com™ for advice or to explain a provision in this Agreement, any response cannot be assumed to be accurate or complete. Ebuyhouse.com™ is not a licensed lawyer and no such response shall be deemed to be the provision of legal services. Each party hereby (1) agrees to indemnify, defend, and hold Ebuyhouse.com™ harmless from any and all claims, losses, and other liabilities arising out of or with regard to this Agreement and the purchase/sale transaction, and (2) irrevocably, voluntarily, and knowingly waives any claims it may have against [Ebuyhouse.com™] with respect to the same.</span>
        </div>
      </div>
      <div class="section">
        <label class="title">
          <span class="ol">17.</span>
          <span class="underline">Miscellaneous Provisions.</span>
        </label>
        <div class="ol-two">
          <span>(a)</span>
          <span>
            <span class="m-l">Risk of Loss.</span>NRS 113.040 applies in full. If the property is destroyed or condemned between the Effective Date and Closing, Seller bears that risk (i.e., Buyer may terminate and recover its Deposit). However, if Buyer takes possession or title before Closing (e.g., by taking possession during the Trial Period), Buyer bears those risks, unless Seller caused the damage.
          </span>
        </div>
        <div class="ol-two">
          <span>(b)</span>
          <span>
            <span class="m-l">Disputes.</span>All disputes and controversies arising out of this Agreement, in contract, tort, equity, or otherwise, are (1) governed by the laws of the State of Nevada, without regard to conflicts-of-law; and (2) subject to exclusive jurisdiction in the County where the Property is located. The prevailing party on the main issue(s) in the dispute shall
          </span>
        </div>
      </div>
    </div>
    <div class="page">
      <div class="section">
        <div class="ol-two" style="text-indent: 0">
          <span>be reimbursed for its reasonable attorneys’ fees and costs. All remedies are cumulative unless stated otherwise herein. Neither party may recover indirect, special, punitive, or consequential damages or lost profits. If any provision herein is determined to be void or unenforceable, this Agreement shall continue in full force and effect without that provision, and the parties (or Court, if necessary) will replace it with a reasonably similar (in purpose/effect), valid, and enforceable term.</span>
        </div>
        <div class="ol-two">
          <span>(c)</span>
          <span>
            <span class="m-l">Anti-Discrimination.</span>The parties will comply with all fair housing laws and regulations, as well as the American Disabilities Act. Neither party will discriminate against any person on the basis of his/her race, color, religion, sex, national origin, ancestry, handicap/disability, sexual orientation, family status, or any other legal classification.
          </span>
        </div>
        <div class="ol-two">
          <span>(d)</span>
          <span>
            <span class="m-l">Integration; Amendments; Assignments.</span>This Agreement is the complete and exclusive statement of the parties’ understandings and supersedes all prior written and oral communications. This Agreement may not be amended except in a writing signed by both parties. Buyer may only assign this Agreement (1) to a wholly-owned subsidiary or (2) with Seller’s prior written consent.
          </span>
        </div>
        <div class="ol-two">
          <span>(e)</span>
          <span>
            <span class="m-l">Survival; Further Assurances.</span>All provisions which should, by their nature/terms, survive termination of this Agreement and the Closing, shall survive for a reasonable period of time, including all indemnities. The parties shall use good faith, commercially reasonable efforts to satisfy all conditions in this Agreement. Each party shall execute and deliver to the other party such deeds, assignments, transfers, and other instruments and documents, and perform such acts, as the other party reasonably requests from time to time.
          </span>
        </div>
        <div class="ol-two">
          <span>(f)</span>
          <span>
            <span class="m-l">Time.</span>Time is of the essence in all of the parties’ obligations.
          </span>
        </div>
        <div class="ol-two">
          <span>(g)</span>
          <span>
            <span class="m-l">Relationship.</span>Nothing herein creates a relationship of (1) principal/agent, (2) partners, joint venturers, or associates, or (3) employer/employee. Neither party has authority to bind the other party.
          </span>
        </div>
        <div class="ol-two">
          <span>(h)</span>
          <span>
            <span class="m-l">Notices.</span>Any required notices shall be in writing and given by (1) U.S. mail, certified or registered, postage prepaid, return receipt requested; (2) Federal Express or similar courier; or (3) personal delivery. Notices are deemed delivered upon actual receipt or attempted delivery.
          </span>
        </div>
        <div class="ol-two">
          <span>(i)</span>
          <span>
            <span class="m-l">No Recordation.</span>Neither party may record this Agreement or a memorandum hereof.
          </span>
        </div>
        <div class="ol-two">
          <span>(j)</span>
          <span>
            <span class="m-l">1031 Exchange.</span>The parties agree to cooperate with each other if one or both wishes to participate in a 1031 exchange. Any party initiating an exchange shall bear all costs of such exchange. No party shall be obligated to extend the Closing as part of that cooperation. A party generally cannot use a 1031 exchange if he/she uses the Property for “personal” use.
          </span>
        </div>
        <div class="ol-two">
          <span>(k)</span>
          <span>
            <span class="m-l">Counsel; Counterparts.</span>Each party had a full opportunity to be represented by counsel in this Agreement. This Agreement shall not be construed in either party’s favor based on who drafted or revised a provision. This Agreement may be executed in counterparts. Any signatures provided by internet, facsimile, or e-mail are binding to the same extent as originals.
          </span>
        </div>
      </div>
      <div class="section">
        <label class="title">
          <span class="ol">18.</span>
          <span class="underline">Added Terms.</span>
        </label>
        <span>If either party has any additional terms for this Agreement, it shall include those terms here. (However, if Buyer includes additional terms, that constitutes a “counteroffer.” There would be no binding contract unless Seller accepts Buyer’s additional terms. This continues until one party’s response is simply, “Agreed.” All other responses shall constitute another counteroffer. Each counteroffer expires at 5:00 p.m. Pacific time on the date [3] Business Days after the prior comment is entered. Until all terms are agreed, either party may terminate discussions by writing in, “Terminated.”</span>
        <div class="station-underline" style="display: block">&nbsp;</div>
        <span style="display: block; text-indent: 0">Seller’s response:</span>
        <div class="station-underline" style="display: block">&nbsp;</div>
        <span style="display: block; text-indent: 0">Buyer’s response:</span>
        <div class="station-underline" style="display: block">&nbsp;</div>
      </div>
    </div>
    <div class="page">
      <div class="footer">
        <div>
          <span class="ol-title">SELLER(S):</span>
          <div class="m-t" style="align-items: center;">
            <span>E-Signature(s):</span>
            <div>
              <img style="max-width: 50%; height: 60pt;" :src="OfferInfo.seller_signature">
            </div>
          </div>
          <div class="m-t">
            <span>Name(s) :</span>
            <div class="station-underline">{{OfferInfo.seller_firstname + '·' + OfferInfo.seller_middlename + '·' + OfferInfo.seller_lastname }}</div>
          </div>
          <div class="m-t">
            <span>Title(s):</span>
            <div class="station-underline">&nbsp;</div>
          </div>
          <div class="m-t">
            <span>Date:</span>
            <div class="station-underline">{{OfferInfo.transfer_days_start_time|timerFormat}}</div>
          </div>
        </div>
        <div>
          <span class="ol-title">BUYER(S):</span>
          <div class="m-t" style="align-items: center;">
            <span>E-Signature(s):</span>
            <div>
              <img style="max-width: 50%; max-height: 300px;height: 60pt" :src="OfferInfo.buyer_signature">
            </div>
          </div>
          <div class="m-t">
            <span>Name(s) :</span>
            <div class="station-underline">{{OfferInfo.buyer_firstname + '·' + OfferInfo.buyer_middlename + '·' + OfferInfo.buyer_lastname }}</div>
          </div>
          <div class="m-t">
            <span>Title(s):</span>
            <div class="station-underline">&nbsp;</div>
          </div>
          <div class="m-t">
            <span>Date:</span>
            <div class="station-underline">{{OfferInfo.transfer_days_start_time|timerFormat}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import VueHtml2Canvas from 'vue-html2canvas'

Vue.use(VueHtml2Canvas)
export default {
  data () {
    return {
      OfferInfo: {},
      output: null
    }
  },
  props: {
    params: {
      default: () => {
        return {id: null}
      },
      type: Object
    },
    status: {
      default: false,
      type: Boolean
    }
  },
  // filters: {
  //   timerFormat: (timer) => {
  //     if (timer === null || timer === '') return
  //     const timers = new Date(timer)
  //     return ` ${timers.getMonth() + 1}/${timers.getDate()}/${timers.getFullYear()}`
  //   }
  // },
  watch: {
    params: {
      handler (_new, _old) {
        this.fetchOffer()
      }
    },
    status: {
      handler (_new) {
        if (_new) {
          this.autopointer()
        }
      }
    }
  },
  created () {
    this.fetchOffer()
  },
  methods: {
    fetchOffer () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}saleHouseOrder/find_sale_agreement_contract`, {params: {saleHouseOrderId: _this.params.id}})
        .then(res => {
          if (res.data.success) {
            // console.log(res.data)
            this.OfferInfo = res.data.data
          }
        })
    },
    autopointer () {
      const el = this.$refs.printMe
      // add option type to get the image version
      // if not provided the promise will return
      // the canvas.
      const options = {
        type: 'dataURL'
      }
      this.output = this.$html2canvas(el, options)
      console.log(this.output)
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "./iconfont.scss";
  @import "./word.scss";
</style>
