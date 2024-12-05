---
title: Coding Conventions
layout: default
---

Consistency in coding practices is essential for efficient collaboration, reproducibility, and maintainability of research projects. This section outlines the recommended coding conventions to ensure clarity, uniformity, and adherence to best practices across the team. By following these guidelines, we aim to streamline workflows and reduce errors in our research data processes.

### CDW-R Schema in the BMC Datahub

#### Creating Tables
When creating tables in your analyst's user schema, analysts are to follow this simple convetion for tables. Such is designed to ensure that another analyst can readily decipher the table's intention.
<br> While analysts are encouraged to leverage temp tables (#tables) in SSMS, cohorts are required to be created as objects. 
```sql
pilastname_irbnumber_descriptor

hofman_h22222_cohort
```

#### Code comments and annotation
Analysts are expected to annotate their code such that another analyst could follow the logic of the code.
