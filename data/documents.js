// Seed data for the Document Adjudication Matrix.
// Edits made in the UI are stored in the browser; use "Export JSON" and paste the
// result here (or replace this array) to make changes permanent for everyone.
window.BINDER_DOCUMENTS = [
  {
    "id": "01",
    "name": "Durable Power of Attorney - Applicant",
    "routes": [
      {
        "category": "Legal Documents- Plan",
        "subCategory": "New DPOA - Applicant"
      }
    ],
    "trigger": "If Power of Attorney is present in Representative Contact Info in Client Info screen",
    "enforcement": "mand-triggered",
    "blocking": false
  },
  {
    "id": "02",
    "name": "Durable Power of Attorney - Spouse",
    "routes": [
      {
        "category": "Legal Documents- Plan",
        "subCategory": "New DPOA - Spouse"
      }
    ],
    "trigger": "Spouse representative / info present (Configurable)",
    "enforcement": "mand-triggered",
    "blocking": false
  },
  {
    "id": "03",
    "name": "Guardianship Document",
    "routes": [
      {
        "category": "Legal Documents- Intake",
        "subCategory": "Guardianship Docs"
      }
    ],
    "trigger": "In Applicant Contact is “Guardian” is selected as Legal Rep",
    "enforcement": "mand-triggered",
    "blocking": false
  },
  {
    "id": "04",
    "name": "Trust Document",
    "routes": [
      {
        "category": "Legal Documents- Intake",
        "subCategory": "Trusts"
      }
    ],
    "trigger": "Need to add a checkbox in Assets called “Trust Asset”. If for any asset this is checked then the Trust Document is needed.",
    "enforcement": "mand-triggered",
    "blocking": false
  },
  {
    "id": "05",
    "name": "Marriage Certificate",
    "routes": [
      {
        "category": "Processing - Identification",
        "subCategory": "Marriage Certificate (Need to Add)"
      }
    ],
    "trigger": "If the Applicant is married",
    "enforcement": "not-mandatory",
    "blocking": false
  },
  {
    "id": "06",
    "name": "Hardship Letter",
    "routes": [
      {
        "category": "Others",
        "subCategory": "Hardship Letter"
      }
    ],
    "trigger": "Hardship option NEEDS to be added to ST on the Case Monitoring>Master Checklist section under Miscellaneous. If checked letter is required.",
    "enforcement": "mand-triggered",
    "blocking": false
  },
  {
    "id": "07",
    "name": "Financial Information Release",
    "routes": [
      {
        "category": "Required By State Agency",
        "subCategory": "Financial release."
      }
    ],
    "trigger": "Every case.",
    "enforcement": "mand-all",
    "blocking": true
  },
  {
    "id": "08",
    "name": "State Issued Identification Cards",
    "routes": [
      {
        "category": "Processing - Identification",
        "subCategory": "State ID"
      }
    ],
    "trigger": "If any document is uploaded on Processing - Identification -> State ID",
    "enforcement": "not-mandatory",
    "blocking": false
  },
  {
    "id": "09",
    "name": "Other Identification documents",
    "routes": [
      {
        "category": "Processing - Identification",
        "subCategory": "All Categories Except StateID"
      }
    ],
    "trigger": "If any document is uploaded on any categories of Processing - Identification except StateID",
    "enforcement": "not-mandatory",
    "blocking": false
  },
  {
    "id": "10",
    "name": "United States Birth Certificate",
    "routes": [
      {
        "category": "DCF Binder",
        "subCategory": "Birth Certificate"
      }
    ],
    "trigger": "Need to add a checkbox called “Non-Citizen” on Client Info. If this checkbox is checked then this document is required.",
    "enforcement": "mand-noncitizen",
    "blocking": false
  },
  {
    "id": "11",
    "name": "United States Birth Passport",
    "routes": [
      {
        "category": "Processing - Identification",
        "subCategory": "Passport"
      }
    ],
    "trigger": "Need to add a checkbox called “Non-Citizen” on Client Info. If this checkbox is checked then this document is required.",
    "enforcement": "mand-noncitizen",
    "blocking": false
  },
  {
    "id": "12",
    "name": "Certificate of Naturalization",
    "routes": [],
    "trigger": "Pending clarification",
    "enforcement": "configurable",
    "blocking": false
  },
  {
    "id": "13",
    "name": "Social Security Card",
    "routes": [
      {
        "category": "Processing - Identification",
        "subCategory": "Social Security card"
      },
      {
        "category": "DCF Binder",
        "subCategory": "Social Security card & Applicant for SSN"
      }
    ],
    "trigger": "If document is present",
    "enforcement": "not-mandatory",
    "blocking": false
  },
  {
    "id": "14",
    "name": "Social Security Award Letter",
    "routes": [],
    "trigger": "If document is present",
    "enforcement": "not-mandatory",
    "blocking": false
  },
  {
    "id": "15",
    "name": "Veterans Affaire Income Letter",
    "routes": [],
    "trigger": "If any income has Type of Income as “Veteran Administration”",
    "enforcement": "mand-triggered",
    "blocking": false
  },
  {
    "id": "16",
    "name": "Pension Letter",
    "routes": [],
    "trigger": "If any income has Type of Income as “Pension Annuity”, “Pension Deceased Spouse”, “Pension WP” and Pension Retirement",
    "enforcement": "mand-triggered",
    "blocking": false
  },
  {
    "id": "17",
    "name": "Pay Stubs for earned income",
    "routes": [],
    "trigger": "Income Type equals Earned Income (Configurable)",
    "enforcement": "mand-triggered",
    "blocking": false
  },
  {
    "id": "18",
    "name": "Confirmation / Statement of most recent Required Minimum Distribution issued",
    "routes": [],
    "trigger": "If any income has Type of Income as “Required Minimum Distribution”",
    "enforcement": "mand-triggered",
    "blocking": false
  },
  {
    "id": "19",
    "name": "Bank Statements",
    "routes": [
      {
        "category": "DCF Binders",
        "subCategory": "Bank or Investment Statements"
      }
    ],
    "trigger": "If any Asset has Type of Asset as “Bank Accounts (excluding IRA’s)”",
    "enforcement": "mand-triggered",
    "blocking": false
  },
  {
    "id": "20",
    "name": "Confirmation of closed account, sold, transferred to gifted assets",
    "routes": [],
    "trigger": "Historical transaction entries present (Configurable)",
    "enforcement": "mand-triggered",
    "blocking": false
  },
  {
    "id": "21",
    "name": "Individual Retirement Account Statements",
    "routes": [],
    "trigger": "If any Asset has Type of Asset as “Retirement Accounts”",
    "enforcement": "mand-triggered",
    "blocking": false
  },
  {
    "id": "22",
    "name": "Annuity Contract",
    "routes": [],
    "trigger": "If any Asset has Type of Asset as “Annuity (excluding IRA’s)”",
    "enforcement": "mand-triggered",
    "blocking": false
  },
  {
    "id": "23",
    "name": "Conversion Documentations",
    "routes": [],
    "trigger": "If There is any entry on Historical Transactions in Asset tab",
    "enforcement": "mand-triggered",
    "blocking": false
  },
  {
    "id": "24",
    "name": "Department of Elder Affairs CARES Form 603",
    "routes": [],
    "trigger": "If “Institutional Care Program Medicaid” is selected while sending Facility Contracting letter",
    "enforcement": "mand-triggered",
    "blocking": false
  },
  {
    "id": "25",
    "name": "Agency for Health Care Administration Form 3008",
    "routes": [
      {
        "category": "Medical Document - LTCCD",
        "subCategory": "3008"
      },
      {
        "category": "Medical",
        "subCategory": "3008"
      }
    ],
    "trigger": "If the Type of Application in application contract is any LTCCD cases",
    "enforcement": "not-mandatory",
    "blocking": false
  },
  {
    "id": "26",
    "name": "Medication List",
    "routes": [
      {
        "category": "Medical Document - Med List",
        "subCategory": ""
      }
    ],
    "trigger": "If the Type of Application in application contract is any LTCCD cases",
    "enforcement": "not-mandatory",
    "blocking": false
  },
  {
    "id": "27",
    "name": "Medicare card Copy",
    "routes": [
      {
        "category": "Processing - Identification",
        "subCategory": "Medicare card"
      }
    ],
    "trigger": "Add to Binder if present",
    "enforcement": "not-mandatory",
    "blocking": false
  },
  {
    "id": "28",
    "name": "Facesheet",
    "routes": [
      {
        "category": "Medical",
        "subCategory": "Facesheet"
      }
    ],
    "trigger": "If “Institutional Care Program Medicaid” is selected while sending Facility Contracting letter",
    "enforcement": "not-mandatory",
    "blocking": false
  },
  {
    "id": "29",
    "name": "Medical Bills",
    "routes": [
      {
        "category": "DCF Binder",
        "subCategory": "Medical Bills/Expenses (Non-Prescription Related)"
      }
    ],
    "trigger": "Medical expenses present (Configurable)",
    "enforcement": "mand-triggered",
    "blocking": false
  },
  {
    "id": "30",
    "name": "Health Insurance Premium Letter",
    "routes": [
      {
        "category": "Health Insurance Verification",
        "subCategory": ""
      }
    ],
    "trigger": "Health insurance present (Configurable)",
    "enforcement": "mand-triggered",
    "blocking": false
  },
  {
    "id": "31",
    "name": "Household Bills",
    "routes": [
      {
        "category": "DCF Binder",
        "subCategory": "Housing and Utility Expenses"
      }
    ],
    "trigger": "If Diversion needed checkbox is checked in Income Tab",
    "enforcement": "mand-triggered",
    "blocking": false
  },
  {
    "id": "32",
    "name": "Real estate Deeds",
    "routes": [
      {
        "category": "Asset Verification",
        "subCategory": "Verification Docs for the specific Asset"
      }
    ],
    "trigger": "If Any Asset has “Homestead” as Type of Assets. If excluded option is checked then its not mandatory. If Excluded option is not checked then its Mandatory",
    "enforcement": "mand-triggered",
    "blocking": true
  },
  {
    "id": "33",
    "name": "Property Valuation",
    "routes": [
      {
        "category": "Others",
        "subCategory": "Valuation (appraisal or CMA etc)"
      }
    ],
    "trigger": "If Any Asset has “Homestead” as Type of Assets. If excluded option is not checked.",
    "enforcement": "mand-triggered",
    "blocking": false
  },
  {
    "id": "34",
    "name": "Vehicle Registration or title",
    "routes": [
      {
        "category": "Asset Verification",
        "subCategory": "Verification Docs for the specific Asset"
      }
    ],
    "trigger": "If Any Asset has “Automobile” as Type of Assets. If excluded option is checked then its not mandatory. If Excluded option is not checked then its Mandatory",
    "enforcement": "mand-triggered",
    "blocking": false
  },
  {
    "id": "35",
    "name": "Life Insurance Policies",
    "routes": [
      {
        "category": "Asset Verification",
        "subCategory": "Verification Docs for the specific Asset"
      }
    ],
    "trigger": "If Any Asset has “Life Insurance Policies” as Type of Assets.",
    "enforcement": "mand-triggered",
    "blocking": false
  },
  {
    "id": "36",
    "name": "Burial Plot Deed and certificate",
    "routes": [
      {
        "category": "Asset Verification",
        "subCategory": "Verification Docs for the specific Asset"
      }
    ],
    "trigger": "If Any Asset has “Prepaid Burial/Connections/Plot” as Type of Assets.",
    "enforcement": "mand-triggered",
    "blocking": false
  },
  {
    "id": "37",
    "name": "Funeral Contract Copy",
    "routes": [
      {
        "category": "Asset Verification",
        "subCategory": "Verification Docs for the specific Asset"
      }
    ],
    "trigger": "Funeral contract present (Configurable)",
    "enforcement": "mand-triggered",
    "blocking": false
  },
  {
    "id": "38",
    "name": "Designated Burial Fund",
    "routes": [
      {
        "category": "Asset Verification",
        "subCategory": "Verification Docs for the specific Asset"
      }
    ],
    "trigger": "If Any Asset has “Prepaid Burial/Connections/Plot” as Type of Assets.",
    "enforcement": "mand-triggered",
    "blocking": false
  },
  {
    "id": "39",
    "name": "Intent to Return",
    "routes": [
      {
        "category": "Required By State Agency",
        "subCategory": "Intent to return"
      }
    ],
    "trigger": "If Any Asset has “Homestead” as Type of Assets.",
    "enforcement": "mand-triggered",
    "blocking": false
  },
  {
    "id": "40",
    "name": "Designated Representative Form #2505",
    "routes": [
      {
        "category": "Required By State Agency",
        "subCategory": "Designated Representative"
      }
    ],
    "trigger": "For All.",
    "enforcement": "mand-all",
    "blocking": false
  },
  {
    "id": "41",
    "name": "Informed Consent Form #2040",
    "routes": [
      {
        "category": "Required By State Agency",
        "subCategory": "Informed Consent"
      }
    ],
    "trigger": "For All.",
    "enforcement": "mand-all",
    "blocking": false
  }
];
