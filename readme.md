# Linker Backend Documentation

## Authorization
   
- To prevent unauthorized access and data manipulation in our database, an authorization token must be included in every request.
- Set the token received via Slack in the headers of each request. Requests without this token will result in a "Missing token" error.

## Auth Requests
   
### Registration
   
#### Registracija Fizickog Lica:
- **Request Type:** POST
- **Route:** /api/auth/register-fizickog-lica
- **Format:** JSON
- **Data:**
  ```json
  {
      "ime": "String*",
      "prezime": "String*",
      "telefon": "String*",
      ...
  }
Registracija Pravnog Lica:
Request Type: POST
Route: /api/auth/register-pravnog-lica
Format: FORM-DATA
Data:
json
Copy code
{
    "ime": "String*",
    "sjediste": "String*",
    "telefon": "String*",
    ...
}
Login
Login Fizickog Lica:
Request Type: POST
Route: /api/auth/login-fizickog-lica
Format: JSON
Data:
json
Copy code
{
    "korisnickoIme": "String*",
    "password": "String*"
}
Login Pravnog Lica:
Request Type: POST
Route: /api/auth/login-fizickog-lica
Format: JSON
Data:
json
Copy code
{
    "korisnickoIme": "String*",
    "password": "String*"
}
Password Management
Nova Lozinka Fizickog Lica:
Request Type: POST
Route: /api/auth/fizicko-lice-novi-password
Format: JSON
Data:
json
Copy code
{
    "email": "String* (Valid Email)"
}
Nova Lozinka Pranovg Lica:
Request Type: POST
Route: /api/auth/pravno-lice-novi-password
Format: JSON
Data:
json
Copy code
{
    "email": "String* (Valid Email)"
}
Promjena Lozinke Fizickog Lica:
Request Type: POST
Route: /api/auth/fizicko-lice-promjena-passworda
Format: JSON
Data:
json
Copy code
{
    "email": "String*",
    "oldPassword": "String*",
    "newPassword": "String*"
}
Promjena Lozinke Pravnog Lica:
Request Type: POST
Route: /api/auth/pravno-lice-promjena-passworda
Format: JSON
Data:
json
Copy code
{
    "email": "String*",
    "oldPassword": "String*",
    "newPassword": "String*"
}
Requests for Individual Users
Requestovi za Fizicko Lice (KorisnickoIme fizickog lica):
Historija Saradnji:
Request Type: GET
Route: /api/fizicko/historija-saradnji/{korisnickoIme}
Response: JSON
Ponude Poslova:
Request Type: GET
Route: /api/fizicko/ponude-poslova/{korisnickoIme}
Response: JSON
Pristigle Ponude:
Request Type: GET
Route: /api/fizicko/pristigle-ponude/{korisnickoIme}
Response: JSON
Posalji Zahtjev:
Request Type: POST
Route: /api/fizicko/posalji-zahtjev
Format: JSON
Data:
json
Copy code
{
    "emailPravnogLica": "String*",
    "emailFizickoLica": "String*",
    ...
}
Requestovi za Pravno Lice (KorisnickoIme pravnog lica):
Historija Saradnje:
Request Type: GET
Route: /api/pravno/historija-saradnje/{korisnickoIme}
Response: JSON
Najprofitabilniji Klijenti:
Request Type: GET
Route: /api/pravno/najprofitabilniji-klijenti/{korisnickoIme}
Response: JSON
Pristigli Zahtjevi:
Request Type: GET
Route: /api/pravno/pristigli-zahtjevi/{korisnickoIme}
Response: JSON
Logo
(backend url default je http://localhost:8080/)/{ime slike koju dobijate u requestu za pravno lice.}
Important Notes
This is the first version of the backend, so expect some bugs. Please report any issues you encounter on Slack and be patient.
If you have any questions or confusion regarding the documentation, feel free to reach out to me on Slack.
Bug Reports
Logotipi stored in the storage will never be deleted.
An account can be created with a non-existent email.
New password won't work if the user is created with a non-existent email.
Email for new password has no design.
Response message does not include characters š, đ, ž, č, ć.
There might be inconsistent writing in the response.
