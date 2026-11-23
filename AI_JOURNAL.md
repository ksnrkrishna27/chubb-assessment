# AI Journal

This file records the prompts used to create or update the assessment deliverables. Prompts are reproduced verbatim where they were used for the corresponding work; technical decisions and verification were reviewed by the candidate.

## Verbatim prompt register

### Assessment scope and documentation

> create .md files for the newly created spec files

> for TESTING_APPROACH.md , update what we implimented as of now
> for AI_COLLABORATION_NOTES.md , as of now add that i want to impliment github actions for this repo

> Vault implimentation to store the credentials

### UI automation

> i want to create a proper POM folder structure , suggest me the folder and file name according to this application

> where can we store locators and test data?

> i want to create a separate file like locators.ts for storing locators
> and i have one doubt , can we create testData.ts under fixtures folder?

> for locator instead of using clases can we use only functions?

> how to access base url in spec files

> create .md file for loginTest spec file and keepit under same e2e folder
> in that .md file we have to explain the tests used in that spec file

> i want to create one yml file to run these tests in github actions, can you create it and explain what you update

> generate appropriate locator for below element

> i need to fetch that text using locator , so i think it is not useful

> impliment this under spec file

> create a method under loginPage and use it in spec file , update the locator in locator file as well

> we created Login positive test block for only claimUser , but i want to reuse that same test block for Admin user as well , we itterate that test block right, by sending the data dynamically

> update the code accordingly

> do we have any other scenarios left?

> I want to create a table locator , to fetch the description and Amount from the table

> make it fetch first row only, because whenever we create a new claim, it will show on first row only

> impliment this in claimSubmission spec file , we have to validate expected and actual data

> dont use await expect
>         .poll(

> what scenarios can we cover next?

> why are we using separate methods to submit a claim?
> we have this method right? submitNewClaim

> I have one scenario
> login with ClaimUser in one browser context
> login with admin in another browser context

> you can use claimLifeCycle spec file to create new test

> updateFirstClaimStatus is used to update the dropdown right
> it used select element and have options tag with values

> what logic you followed here

> add .md file for the spec file which dont have

### Security and repository setup

> i added the credentials under testdata file right
> its not a good practice to follow and the examiner will think its red flag , so suggest me how can fix that quickly

> after this setup , if i clone that repo in other computer will the creds work?

> impliment this now

> it is under
> Untracked files:
>         code/demo-app-ui/.env.example

### Review and submission

> before sending , can you check if there are any mistakes in my playwright repo?

> did you ran althose tests?

> as of now just update the documentation files.

> I think its enough, i dont have time for remaining to implement

> create a new spec for claimSubmition.spec.ts and add basic structure of the code

> I want to create one method for both flows , only at the beginning we have to choose where to go like button or tab , we can handle that via parameter, you can add that helper under claimsPage.ts

> after fillIncidentDetails , we have to enter description in textarea element, before that , we can check one validation , next button in that section will only activate only if we enter 10 characters , we can check by entering 9 characters only and check Next button is disabled,

> I want to create one test block
> At first i will login with normal claim user
> Submit a new claim using submitNewClaim, logout from claim user
> now login with Admin

### API automation

> I want to create one api test 
> in that with the help of API we have to submit a new claim and console.log the response

> what other important validations can we add?

### Current recruiter review request

> I got some review comments from the recruiter, analyze all those checklists and correct the repo accoedingly

> Please check the below details and update the THA assessment and share the completion link by today or tomorrow first half.

> This checklist requires 7 deliverables, and every item must be completed before submission.
>
> 1. AI Journal
>
> Every prompt used is recorded across all deliverables
> Prompts are copied exactly as written (not summarized)
> 2. Architecture
>
> Short architecture diagram included
> Main components and connections labeled
> 3. Test Strategy
>
> Risks listed
> Scope defined (in scope / out of scope)
> Entry criteria defined
> Exit criteria defined
> 4. Test Cases
>
> Written using the provided test case template
> Positive test cases included
> Negative test cases included
> Test data listed
> 5. Playwright UI Tests
>
> Tests written for the claims application
> 5–10 tests covering positive and negative scenarios
> Page Object Model (POM) implemented
> Fixtures used for setup and shared objects
> Assertions present in every test
> Screenshots captured
> Video recording of test execution captured
> Playwright best practices followed:
> No fixed sleeps
> Stable locators
> Clear test names
> No hard-coded credentials
> 6. API Tests
>
> Schema validation included
> Validations included:
> Status codes
> Response fields
> Invalid input scenarios
> Missing input scenarios
> 7. Defect Report
>
> Defect logged using the provided template
> Every field completed
> Screenshot or video evidence attached

## Decisions and review

- Existing prompts were kept as written instead of being rewritten into summaries.
- Credentials remain environment-driven; `.env.example` is the only committed credential template.
- API schema validation is implemented without adding a new dependency.
- No product defect was invented when the final scoped run did not reproduce one; the completed defect report records that result.
