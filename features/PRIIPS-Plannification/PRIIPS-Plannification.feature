 Feature: Planification PRIIPS

       As an Impress user
       I want to run an annual report workflow
       So that I can generate an annual report

      @IMPRESS-15442

        Scenario Outline: Schedule Search

            Given I am logged in with <user> and <password>
             When I navigate to the screen <screen>
             Then I search for criteria <criteria> and <values>
             And The spreadsheet must be displayed

     
        Examples:
                  | user            | password    | screen        | criteria                   | values                          | 
                  | abir.khabthani  |             | Planification | Début;Fin;Langue;Fréquence | 2023-02-07;2024-12-26;en;MONTHLY|  


      @IMPRESS-15443
         
        Scenario Outline: Display The Schedule FORM POPUP

            Given I am logged in with <user> and <password>
             When I navigate to the screen <screen>
             And I click on the create button
             Then The schedule form popup should be displayed

     
        Examples:
                  | user            | password    | screen        | 
                  | abir.khabthani  |             | Planification | 

