

Scenario Outline: Relaunching workflow

            Given I am logged in with <user> and <password>
             When I search for criteria <criteria> and <values>
              And I access to details of the first result
              And I relaunch the workflow from Initialisation
              And I click on step <StepActionName>
             Then <StepActionName> switchs to <StepStatus> status before <timeOut>
              And I verifiy that <steps> status is <OtherStepStatus> before <timeOut>
    

        Examples:
                  | user           | password | criteria                                            | values                           | StepActionName | StepStatus | steps                                    | timeOut | OtherStepStatus                         |
                  | IMP_AUTOMATION | Neoxam23 | Mois d'arrêté;Document;Juridiction;Langue;Code Ptf. | 2021-12;AA-FR-UCITS;fr;fr;050552 | Initialisation | success    | Compute;Contrib;Génération;Audit;Edition | 10000   | waiting;waiting;waiting;waiting;waiting |


Scenario Outline: Validate edition step
  
            Given I am logged in with <user> and <password>
             When I search for criteria <criteria> and <values>
              And I access to details of the first result
              And I relaunch the workflow from Initialisation
              And I click on step <StepActionName>
              And <StepActionName> switchs to wait validation status before <timeOut>
             When I click on button <buttonName>
             Then <StepActionName> switchs to <StepStatus> status before <timeOut>
              And I verifiy that <steps> status is <OtherStepStatus> before <timeOut>
              And Auditeur switchs to <StepActionStatus> status before <timeOut>
   
  
        Examples:
                  | user           | password | criteria                                            | values                           | StepActionName | StepActionStatus | buttonName | StepStatus | timeOut | steps        | OtherStepStatus         |
                  | IMP_AUTOMATION | Neoxam23 | Mois d'arrêté;Document;Juridiction;Langue;Code Ptf. | 2021-12;AA-FR-UCITS;fr;fr;050666 | Edition        | wait validation  | Accepter   | success    | 900000  | Docx;Doc;Pdf | success;success;success |
                  | IMP_AUTOMATION | Neoxam23 | Mois d'arrêté;Document;Juridiction;Langue;Code Ptf. | 2021-12;AA-FR-UCITS;fr;fr;050666 | Edition        | waiting          | Rejeter    | error      | 900000  | Docx;Doc;Pdf | waiting;waiting;waiting |                  


Scenario Outline: Show Details for first report
            Given I am  logged in with <user>  and <password> 
            When I search for criteria <criteria> and <values>
            And I access to details of the  first result
            And I clic on step <finalStepName>
            And I click on button <buttonName>
            Then Document Icon is Displayed
            And I download <document>

