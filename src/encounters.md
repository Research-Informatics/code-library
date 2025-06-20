---
title: Encounters
layout: default
---

## Encounter Types

For cohort derivation and data extraction, it is important to consider the encounter types you are using in your queries. Often, the research question requires our team to specify encounters of interest, even in the case of "all utilization".

The Research Data Warehouse has accounted for several nuances regarding encounters and are essential for you to be aware of as you query.

### **dbo.EncounterAncillary_V**
This view is designed to bifurcate encounters to isolate services that support care but don’t initiate or coordinate treatment. This decision enables us to readily query encounters of primary interest to Research while still having ready access to ancillary encounters. Ancillary encounters are still critical, but they typically reflect follow-up, monitoring, or supportive care rather than primary medical management. Depending on the research question, you may need to include this view in your work.

### **dbo.Encounter_V**
This is the primary view for encounters and should be used in most cases. 

Below are the fields in encounter_v.


| Data Field                    | Data Type   | Brief Description                                                 | Important Reminders                                           |
|------------------------------|-------------|------------------------------------------------------------------|--------------------------------------------------------------|
| EncounterKey                 | bigint      | Unique identifier for the encounter.                              | Caboodle primary key. Should only need to use this for joining within Caboodle schema. |
| EncounterEpicCsn            | nvarchar    | Epic Contact Serial Number.                                       | CDWR has been engineered so you may utilizez this to join throughout the CDWR schema and into Clarity.              |
| PatientEpicId               | nvarchar    | Epic identifier for the patient.                                  | Link back to patient_v or related patient tables.             |
| MRN                         | nvarchar    | Medical Record Number.                                            | Ensure consistency with patient_v.                            |
| HospitalAccountId           | nvarchar    | Billing account ID associated with the encounter.                 | May not exist for all encounters (e.g., outpatient).          |
| PatientClassEpicId          | nvarchar    | Epic identifier for patient class.                                | Links to Epic patient class configuration.                    |
| PatientClass                | nvarchar    | Describes the class of the patient (e.g., Inpatient, Outpatient). | Used to differentiate care setting.                           |
| EncounterTypeEpicId         | nvarchar    | Epic ID for the type of encounter.                                | Can be used to group or filter encounters.                    |
| EncounterType               | nvarchar    | Text description of the encounter type.                           | Review to identify ancillary vs primary care types.           |
| ServiceDate                 | datetime    | Date services were rendered.                                      | Used for temporal filtering and reporting.                    |
| AdmissionDate               | datetime    | Date the patient was admitted.                                    | Typically null for non-admission encounters.                  |
| DischargeDate               | datetime    | Date the patient was discharged.                                  | Typically null for non-admission encounters.                  |
| PlaceOfService              | nvarchar    | Location where the service was provided.                          | Important for billing and encounter classification.           |
| DepartmentEpicId            | nvarchar    | Epic department ID.                                               | Join to department reference tables.                          |
| DepartmentName              | nvarchar    | Name of the department rendering care.                            | Use to group or exclude ancillary locations.                  |
| DepartmentSpecialty         | nvarchar    | Specialty of the department.                                      | Helpful for specialty-based analysis.                         |
| VisitTypeEpicId             | nvarchar    | Epic visit type ID.                                               | Use for standard visit classification.                        |
| VisitType                   | nvarchar    | Text name of the visit type.                                      | Key to distinguishing ancillary encounters.                   |
| DischargeDisposition        | nvarchar    | How the patient was discharged.                                   | More relevant for inpatient/ED discharges.                    |
| IsHospitalAdmission         | bit         | Flag for hospital admission.                                      | Used to identify inpatient encounters.                        |
| IsEdVisit                   | bit         | Flag for emergency department visit.                              | Identifies ED encounters.                                     |
| IsOutpatientFaceToFaceVisit | bit         | Flag for outpatient face-to-face encounter.                       | Used in ambulatory visit counts.                              |
| ProviderEpicId              | nvarchar    | Epic ID of the rendering provider.                                | Can link to provider reference tables.                        |
| ProviderName                | nvarchar    | Name of the rendering provider.                                   | Used for reporting and grouping.                              |
| ProviderType                | nvarchar    | Type of provider (e.g., MD, NP).                                  | Use to analyze provider mix.                                  |
| EdAcuityLevel               | nvarchar    | Triage level of emergency encounter.                              | Used for ED acuity analysis.                                  |
| ArrivalMethod               | nvarchar    | How the patient arrived to ED.                                    | Relevant for ED workflow analysis.                            |
| EdArrivalDate               | datetime    | Date/time patient arrived to ED.                                  | Use for ED throughput.                                        |
| RoomedDate                  | datetime    | Date/time patient was placed in a room.                           | Supports ED timing metrics.                                   |
| RegistrationCompleteDate    | datetime    | Date/time registration was completed.                             | Use for registration delay analysis.                          |
| EdDepartureDate             | datetime    | Time patient left the ED.                                         | Calculate ED length of stay.                                  |
| EdDischargeDisposition      | nvarchar    | ED-specific discharge disposition.                                | Refines disposition logic.                                    |
| EdGenericDispo              | nvarchar    | Generalized ED disposition bucket.                                | Standardized version of ED discharge.                         |
| EdLevelOfCare               | nvarchar    | Level of care required during ED stay.                            | Supports care intensity classification.                       |
| CalcLOSDays                 | decimal     | Calculated length of stay in days.                                | Derived from admission/discharge.                             |
| AdmissionOrigin             | nvarchar    | Where the patient came from.                                      | E.g., home, nursing facility.                                 |
| HospitalService             | nvarchar    | Hospital service line.                                            | E.g., Medicine, Surgery.                                      |
| AdmissionType               | nvarchar    | Type of admission.                                                | E.g., Elective, Emergency.                                    |
| AdmissionSource             | nvarchar    | Source of admission.                                              | E.g., ED, Transfer.                                           |
| AdmissionConfirmationStatus | nvarchar    | Whether admission is confirmed.                                   | May be pending or confirmed.                                  |
| InpatientLengthOfStayInDays | decimal     | LOS for admitted patients.                                        | Used in inpatient utilization.                                |
| DischargePatientClass       | nvarchar    | Patient class at discharge.                                       | Track class transitions.                                      |
| AppointmentStatus           | nvarchar    | Status of appointment.                                            | Scheduled, Completed, Cancelled, etc.                         |
| AppointmentConfirmationStatus | nvarchar  | Confirmation status.                                              | E.g., Confirmed, Not confirmed.                               |
| ApptScheduledDate           | datetime    | Date appointment was scheduled.                                   | Compare to actual visit date.                                 |
| ApptDate                    | datetime    | Date of the appointment.                                          | Primary outpatient date of service.                           |
| ApptCheckInTime             | datetime    | Time patient checked in.                                          | Useful for wait time analysis.                                |
| IsWithPCP                   | bit         | Flag if encounter was with PCP.                                   | Used to track continuity of care.                             |
| Telehealth                  | bit         | Flag for telehealth encounter.                                    | Separate from in-person encounters.                           |
| TelehealthMode              | nvarchar    | Modality of telehealth (e.g., video, phone).                      | Use for modality-specific counts.                             |
| HeightInInches              | decimal     | Patient height at visit.                                          | Check for missing or outlier values.                          |
| WeightInOunces              | decimal     | Weight recorded in ounces.                                        | Used for precise weight tracking.                             |
| WeightInPounds              | decimal     | Weight in pounds.                                                 | Commonly used weight metric.                                  |
| BMI                         | decimal     | Body Mass Index.                                                  | Calculated from height and weight.                            |
| TempF                       | decimal     | Temperature in Fahrenheit.                                        | Look for extreme or missing values.                           |
| PartII                      | bit         | Indicates 42 CFR Part 2 sensitivity.                              | May require special data handling.                            |
| AgeYears                    | int         | Age in full years at encounter.                                   | Useful for age stratification.                                |
| AgeMonths                   | int         | Age in months for infants.                                        | Supports pediatric analysis.                                  |
| CreationDate                | datetime    | Date the record was created.                                      | Auditing and tracking purposes.                               |
| UpdateDate                  | datetime    | Date the record was last updated.                                 | Used to detect stale data.                                    |
| DerivedEncounterStatus      | nvarchar    | Status derived from multiple encounter fields.                    | Helps interpret active vs. completed visits.                  |
| OutpatientDuringInpatient   | bit         | Flag for outpatient services during inpatient stay.               | Used to prevent double-counting.                              |
| IcuStay                     | bit         | Flag if encounter included ICU stay.                              | Supports critical care tracking.                              |
| PrimaryDiagnosisCode        | nvarchar    | Primary diagnosis code for encounter.                             | Often used for grouping or filtering.                         |
| PrimaryDiagnosisName        | nvarchar    | Diagnosis description.                                            | Check for nulls or vague descriptions.                        |
