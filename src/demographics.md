---
title: Patient Demographics
layout: default
---

## Demographic Snips


### .demo
<!-- Tags: .demo -->
**Tags**: demographics, cohort, SQL, patient data
Use this to get basic demographics for a known cohort for extraction. Requires cohort joined on patientepicid.
<pre><code class="sql">
SELECT DISTINCT coh.id, ageinyears, pat.sexassignedatbirth, pat.preferredlanguage, 
pat.firstrace, pat.cdwrrace AS cdwrrace, ethnicity AS hispanicindicator 
FROM cdwr.[user].[cohort] coh
INNER JOIN cdwr.dbo.patient_v pat
    ON pat.patientepicid = coh.patientepicid
ORDER BY coh.id;
</code></pre>

### .demorecruit
Use this snip to get demographics when providing the data for recruitment purposes. 

<pre><code class="sql">
SELECT DISTINCT coh.id, ageinyears, pat.sexassignedatbirth, pat.preferredlanguage, pat.firstrace, pat.cdwrrace AS cdwrrace, ethnicity AS hispanicindicator 
, pat.interpreterneeded, mychartstatus, sex as legalsex, genderidentity,pro.pronoun --recruitment specific variables
--researchcontactpreference --unsure what this is / reliability is suspect etc
FROM cdwr.user.cohort coh --adjust for cohort of interest
INNER JOIN cdwr.dbo.patient_v pat
--	ON pat.mrn = coh.mrn
--LEFT OUTER JOIN patientpronouns_v pro
--	ON pro.
WHERE pat.vitalstatus = 'Alive' --maybe unnecessary, patients should already be noted as alive prior
ORDER BY coh.id
</code></pre>

### CDWR.dbo.patient_v
#### Notes on demographic data elements
birthdate, deathdate, zip, etc not considered patient demographics as they are HIPAA identifiers
<br>**Sex:** default to sexassignedatbirth, if others are requested include "sex as legalsex, genderidentity"
<br>**Race:** default to cdwrrace as race "firstrace" means nothing as is confusing, suggests something we cannot assume.
Below are the fields available in cdwr.dbo.patient_v. 

| Data Field                      | Data Type   | Brief Description                                      | Important Reminders                          |
|---------------------------------|-------------|-------------------------------------------------------|---------------------------------------------|
| PatientKey                      | bigint      | Unique identifier for the patient. Can be used to join on PatientDurableKey                 | Primary key, used for linking records.      |
| MRN                             | nvarchar    | Medical Record Number.                               | Ensure uniqueness within the system.        |
| PatientEpicId                   | nvarchar    | Epic system identifier for the patient.              | Used for system integration.                |
| FirstName                       | nvarchar    | Patient's first name.                                | Ensure consistent formatting.               |
| MiddleName                      | nvarchar    | Patient's middle name.                               | May be null or blank.                       |
| LastName                        | nvarchar    | Patient's last name.                                 | Ensure consistent formatting.               |
| patname                         | nvarchar    | Full patient name (concatenated).                    | May duplicate `FirstName` and `LastName`.   |
| PreferredName                   | nvarchar    | Name the patient prefers to be called.               | Useful for personalization.                 |
| BirthDate                       | date        | Patient's date of birth.                             | Critical for age calculations.              |
| AgeInMonths                     | int         | Patient's age in months.                             | Derived field, validate against `BirthDate`.|
| AgeInYears                      | tinyint     | Patient's age in years.                              | Derived field, validate against `BirthDate`.|
| Sex                             | nvarchar    | Patient's sex (biological).                         | Ensure alignment with standard codes.       |
| GenderIdentity                  | nvarchar    | Patient's gender identity.                          | Allow for diverse values.                   |
| SexAssignedAtBirth              | nvarchar    | Sex assigned at birth.                              | Use for clinical or research contexts.      |
| SexualOrientation               | nvarchar    | Patient's sexual orientation.                       | Ensure confidentiality.                     |
| VitalStatus                     | nvarchar    | Indicates if the patient is alive or deceased.      | Align with system definitions.              |
| DeathDate                       | date        | Date of death if deceased.                          | Ensure consistency with `VitalStatus`.      |
| PreferredLanguage               | nvarchar    | Language the patient prefers for communication.     | Useful for patient interactions.            |
| InterpreterNeeded               | nvarchar    | Indicates if an interpreter is required.            | Important for clinical workflows.           |
| FirstRace                       | nvarchar    | Primary race of the patient.                        | Follow standard coding systems.             |
| SecondRace                      | nvarchar    | Secondary race of the patient.                      | Optional, if applicable.                    |
| CDWRRace                        | nvarchar    | Consolidated race value in CDWR.                    | Use for reporting purposes.                 |
| Ethnicity                       | nvarchar    | Patient's ethnicity.                                | Follow standard coding systems.             |
| CountryOfOrigin                 | nvarchar    | Country where the patient was born.                 | May be null or blank.                       |
| Address                         | nvarchar    | Patient's residential address.                      | Ensure current and complete.                |
| City                            | nvarchar    | City of residence.                                  | Derived from `Address`.                     |
| StateOrProvince                 | nvarchar    | State or province of residence.                     | Derived from `Address`.                     |
| Zip                             | nvarchar    | Postal code of residence.                           | Derived from `Address`.                     |
| Country                         | nvarchar    | Country of residence.                               | Derived from `Address`.                     |
| CensusTractKey                  | bigint      | Key for census tract data.                         | Used for demographic analyses.              |
| HomePhoneNumber                 | nvarchar    | Patient's home phone number.                       | Ensure phone number formatting.             |
| WorkPhoneNumber                 | nvarchar    | Patient's work phone number.                       | Optional, if provided.                      |
| FirstPreferredPhoneNumber_X     | nvarchar    | First preferred phone number.                      | Useful for contact purposes.                |
| FirstPreferredPhoneNumberType_X | nvarchar    | Type of preferred phone number.                    | E.g., mobile, home, work.                   |
| SmsConsent_X                    | nvarchar    | Consent for SMS communication.                     | Ensure compliance with privacy policies.    |
| EmailAddress                    | nvarchar    | Patient's email address.                           | Validate for communication purposes.        |
| MaritalStatus                   | nvarchar    | Marital status of the patient.                     | Optional field.                             |
| HighestLevelOfEducation          | nvarchar    | Patient's education level.                         | Useful for demographic insights.            |
| MotherPatientKey                | bigint      | Link to the patient record of the mother.          | Key for family relationship data.           |
| ResearchContactPreference       | nvarchar    | Indicates research contact preferences.            | Ensure compliance with opt-in policies.     |
| MyChartStatus                   | nvarchar    | Status of the patient's MyChart account.           | Track portal access activity.               |
