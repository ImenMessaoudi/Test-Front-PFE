@IMPRESS-11503
 
Feature: PRIIPS_Workflows
 
       As an Impress user
       I want to run 
       So that I can 
   @IMPRESS-13945
 
      Scenario Outline: PRIIPS Narrative Computation
       Given I am logged in with <user> and <password>
       When I search for criteria <criteria> and <values>
       And I access to details of the first result
       And I relaunch the workflow from Initialisation
       And I click on step <StepActionName>
       And <StepActionName> switchs to <StepStatus> status before <timeOut>
       And I choose to download the <document>
       Then The <document> should be downloaded

 
    Examples:
      | user          | password      | criteria                                            | values                                             | StepActionName | StepStatus  | timeOut | document                                                 |                                                        
      | IMP_STANDARD  | Neoxam123*    | Mois d'arrêté;Document;Juridiction;Langue;Code Ptf. | 2023-05;PRIIPS-NARRATIVE-COMPUTATION;lu;en;001915  | Audit          | finished    | 1000000 | 001915_2023-05-31_PRIIPS-NARRATIVE-COMPUTATION_lu_audit  |
 
 
   @IMPRESS-13946
 
      Scenario Outline: PRIIPS Past Perf Computation
       Given I am logged in with <user> and <password>
       When I search for criteria <criteria> and <values>
       And I access to details of the first result
       And I relaunch the workflow from Initialisation
       And I click on step <StepActionName>
       And <StepActionName> switchs to <StepStatus> status before <timeOut>
       And I choose to download the <document>
       Then The <document> should be downloaded
 
    Examples:
 
      | user          | password      | criteria                                            | values                                             | StepActionName | StepStatus  | timeOut | document                                                |                                                         
      | IMP_STANDARD  |  Neoxam123*   | Mois d'arrêté;Document;Juridiction;Langue;Code Ptf. | 2021-12;PRIIPS-PAST-PERF-COMPUTATION;lu;en;001915  | Audit          | finished    | 1000000 | 001915_2021-12-31_PRIIPS-PAST-PERF-COMPUTATION_lu_audit |
 
 
   @IMPRESS-13937
 
      Scenario Outline: PRIIPS Risk Perf Computation
       Given I am logged in with <user> and <password>
       When I search for criteria <criteria> and <values>
       And I access to details of the first result
       And I relaunch the workflow from Initialisation
       And I click on step <StepActionName>
       And <StepActionName> switchs to <StepStatus> status before <timeOut>
       And I choose to download the <document>
       Then The <document> should be downloaded
 
 
    Examples:
 
      | user          | password      | criteria                                            | values                                             | StepActionName | StepStatus  | timeOut | document                                                |                                                         
      | IMP_STANDARD  | Neoxam123*    | Mois d'arrêté;Document;Juridiction;Langue;Code Ptf. | 2021-12;PRIIPS-RISK-PERF-COMPUTATION;lu;en;001915  | Audit          | finished    | 1000000 | 001915_2021-12-31_PRIIPS-RISK-PERF-COMPUTATION_lu_audit |
 
   @IMPRESS-13948
 
      Scenario Outline: PRIIPS Germany Computation
       Given I am logged in with <user> and <password>
       When I search for criteria <criteria> and <values>
       And I access to details of the first result
       And I relaunch the workflow from Initialisation
       And I click on step <StepActionName>
       And <StepActionName> switchs to <StepStatus> status before <timeOut>
       And I choose to download the <document>
       Then The <document> should be downloaded
 
 
    Examples:
 
      | user          | password      | criteria                                            | values                                           | StepActionName | StepStatus  | timeOut | document                                                |                                                         
      | IMP_STANDARD  | Neoxam123*    | Mois d'arrêté;Document;Juridiction;Langue;Code Ptf. | 2021-12;PRIIPS-GERMANY-COMPUTATION;lu;en;001915  | Audit          | finished    | 1000000 | 001915_2021-12-31_PRIIPS-GERMANY-COMPUTATION_lu_audit |
 

   @IMPRESS-13949
 
      Scenario Outline: PRIIPS EPT 2-1 Computation
       Given I am logged in with <user> and <password>
       When I search for criteria <criteria> and <values>
       And I access to details of the first result
       And I relaunch the workflow from Initialisation
       And I click on step <StepActionName>
       And <StepActionName> switchs to <StepStatus> status before <timeOut>
       And I choose to download the <document>
       Then The <document> should be downloaded
 
 
    Examples:
 
      | user          | password      | criteria                                            | values                                           | StepActionName | StepStatus  | timeOut | document                                              |                                                         
      | IMP_STANDARD  | Neoxam123*    | Mois d'arrêté;Document;Juridiction;Langue;Code Ptf. | 2021-12;PRIIPS-EPT-2-1-COMPUTATION;lu;en;001915  | Audit          | finished    | 1000000 | 001915_2021-12-31_PRIIPS-EPT-2-1-COMPUTATION_lu_audit |
 
 
  @IMPRESS-13952
 
      Scenario Outline: PRIIPS Perf Web Computation
       Given I am logged in with <user> and <password>
       When I search for criteria <criteria> and <values>
       And I access to details of the first result
       And I relaunch the workflow from Initialisation
       And I click on step <StepActionName>
       And <StepActionName> switchs to <StepStatus> status before <timeOut>
       And I choose to download the <document>
       Then The <document> should be downloaded
 
 
    Examples:
 
      | user          | password      | criteria                                            | values                                            | StepActionName | StepStatus  | timeOut | document                                               |                                                         
      | IMP_STANDARD  | Neoxam123*    | Mois d'arrêté;Document;Juridiction;Langue;Code Ptf. | 2021-12;PRIIPS-PERF-WEB-COMPUTATION;lu;en;001915  | Audit          | finished    | 1000000 | 001915_2021-12-31_PRIIPS-PERF-WEB-COMPUTATION_lu_audit |
 
 
  @IMPRESS-13953
 
      Scenario Outline: PRIIPS KID Computation
       Given I am logged in with <user> and <password>
       When I search for criteria <criteria> and <values>
       And I access to details of the first result
       And I relaunch the workflow from Initialisation
       And I click on step <StepActionName>
       And <StepActionName> switchs to <StepStatus> status before <timeOut>
       And I choose to download the <document>
       Then The <document> should be downloaded
 
 
    Examples:
 
      | user          | password      | criteria                                            | values                                       | StepActionName | StepStatus  | timeOut | document                                            |                                                         
      | IMP_STANDARD  | Neoxam123*    | Mois d'arrêté;Document;Juridiction;Langue;Code Ptf. | 2021-12;PRIIPS-KID-COMPUTATION;lu;en;001915  | Audit          | finished    | 1000000 | 001915_2021-12-31_PRIIPS-KID-COMPUTATION_lu_audit   |
 
  @IMPRESS-13959
 
      Scenario Outline: PRIIPS PERF WEB REPORT
       Given I am logged in with <user> and <password>
       When I search for criteria <criteria> and <values>
       And I access to details of the first result
       And I relaunch the workflow from Initialisation
       And I click on step <StepActionName>
       And <StepActionName> switchs to <StepStatus> status before <timeOut>
       And I choose to download the <document>
       Then The <document> should be downloaded
 
 
    Examples:
 
      | user          | password     | criteria                                            | values                                       | StepActionName    | StepStatus  | timeOut | document                                                  |                                                         
      | IMP_STANDARD  | Neoxam123*   | Mois d'arrêté;Document;Juridiction;Langue;Code Ptf. | 2021-12;PRIIPS-PERF-WEB-REPORT;lu;en;001915  | Génération HTML   | success     | 1000000 | PART_001915_C1_2021-12-31_PRIIPS-PERF-WEB-REPORT_lu_final   |
 
  @IMPRESS-13956
 
      Scenario Outline: PRIIPS EMT 4-0 Computation
       Given I am logged in with <user> and <password>
       When I search for criteria <criteria> and <values>
       And I access to details of the first result
       And I relaunch the workflow from Initialisation
       And I click on step <StepActionName>
       And <StepActionName> switchs to <StepStatus> status before <timeOut>
       And I choose to download the <document>
       Then The <document> should be downloaded
 
 
    Examples:
 
      | user          | password      | criteria                                            | values                                           | StepActionName | StepStatus  | timeOut | document                                               |                                                         
      | IMP_STANDARD  | Neoxam123*    | Mois d'arrêté;Document;Juridiction;Langue;Code Ptf. | 2021-12;PRIIPS-EMT-4-0-COMPUTATION;lu;en;001915  | Audit          | finished    | 1000000 | 001915_2021-12-31_PRIIPS-EMT-4-0-COMPUTATION_lu_audit  |
 
   @IMPRESS-13949
 
      Scenario Outline: PRIIPS EPT 2-1 Report
       Given I am logged in with <user> and <password>
       When I search for criteria <criteria> and <values>
       And I access to details of the first result
       And I relaunch the workflow from Initialisation
       And I click on step <StepActionName>
       And <StepActionName> switchs to <StepStatus> status before <timeOut>
       And I choose to download the <document>
       And The <document> should be downloaded
       And I click on step Validation
       And Validation switchs to wait validation status before <timeOut>
       And I click on button Accept
       Then Validation switchs to finished status before <timeOut>
 
 
    Examples:
 
      | user          | password      | criteria                                            | values                                      | StepActionName   | StepStatus  | timeOut | document                                                 |                                                         
      | IMP_STANDARD  | Neoxam123*    | Mois d'arrêté;Document;Juridiction;Langue;Code Ptf. | 2021-12;PRIIPS-EPT-2-1-REPORT;lu;en;001915  | Génération XLSX  | success     | 1000000 | PART_001915_C1_2021-12-31_PRIIPS-EPT-2-1-REPORT_lu_final |
 
 
   @IMPRESS-13957
 
      Scenario Outline: PRIIPS KID Report
       Given I am logged in with <user> and <password>
       When I search for criteria <criteria> and <values>
       And I access to details of the first result
       And I relaunch the workflow from Initialisation
       And I click on step Edition
       And Edition switchs to wait validation status before <timeOut>
       And I click on button Reject
       And Edition switchs to error status before <timeOut>
       And I click on button Relancer
       And Edition switchs to wait validation status before <timeOut>
       And I click on button Accept
       And Edition switchs to success status before <timeOut>
       And I click on step <StepActionName>
       And <StepActionName> switchs to <StepStatus> status before <timeOut>
       And I choose to download the <document>
       And The <document> should be downloaded
       And I click on step Pdf
       Then I  download the Pdf document <PdfDocument> in the specified directory
 
 
    Examples:
 
      | user          | password      | criteria                                            | values                                  | StepActionName   | StepStatus  | timeOut | document                                                 | PdfDocument                                           |             
      | IMP_STANDARD  | Neoxam123*    | Mois d'arrêté;Document;Juridiction;Langue;Code Ptf. | 2021-12;PRIIPS-KID-REPORT;lu;fr;001915  | Docx             | success     | 1000000 | PART_001915_D1_2021-12-31_PRIIPS-KID-REPORT_lu_final     | PART_001915_D1_2021-12-31_PRIIPS-KID-REPORT_lu_final  |
 
 
  @IMPRESS-13947
 
      Scenario Outline: PRIIPS Costs Riy Computation
       Given I am logged in with <user> and <password>
       When I search for criteria <criteria> and <values>
       And I access to details of the first result
       And I relaunch the workflow from Initialisation
       And I click on step <StepActionName>
       And <StepActionName> switchs to <StepStatus> status before <timeOut>
       And I choose to download the <document>
       Then The <document> should be downloaded
 
 
    Examples:
 
      | user          | password      | criteria                                            | values                                             | StepActionName | StepStatus  | timeOut | document                                                |                                                         
      | IMP_STANDARD  | Neoxam123*    | Mois d'arrêté;Document;Juridiction;Langue;Code Ptf. | 2021-12;PRIIPS-COSTS-RIY-COMPUTATION;lu;en;001915  | Audit          | finished    | 1000000 | 001915_2021-12-31_PRIIPS-COSTS-RIY-COMPUTATION_lu_audit |