# Linker Backend Documentation

## Authorization
- Kako nebi mogao svako da posalje request i mijenja podatke u nasoj databazi postavio sam authorization token koji se mora postaviti na svaki request.
- u headers postavite token koji cete dobiti na slacku. bez tog tokena dobit cete error "Missing token."

##Auth Requests
### Registracija Fizickog Lica:
- Request Type: POST
- Route: /api/auth/register-fizickog-lica
- Format: JSON
- data: {
```json
ime: String*,
prezime: String*,
telefon: String*,
email: String* (OVO MORA BITI JEDINSTVENO),
korisnickoIme: String* (OVO MORA BITI JEDINSTVENO),
password: String*
```
}

### Registracija Pravnog Lica:
- Request Type: POST
- Route: /api/auth/register-pravnog-lica
- Format: FORM-- DATA
- data: {
```json
ime: String*,
sjediste: String*,
telefon: String*,
IDBroj: String*,
djelatnost: String*,
email: String* (OVO MORA BITI JEDINSTVENO),
korisnickoIme: String* (OVO MORA BITI JEDINSTVENO),
password: String*,
logotip: File,
```
}

### Login Fizickog Lica:
- Request Type: POST
- Route: /api/auth/login-fizickog-lica
- Format: JSON
- data: {
```json
korisnickoIme: String*,
password: String*
```
}

### Login Pranvnog Lica:
- Request Type: POST
- Route: /api/auth/login-fizickog-lica
- Format: JSON
- data: {
```json
korisnickoIme: String*,
password: String*
```
}


### Nova Lozinka Fizickog Lica:
- Request Type: POST
- Route: /api/auth/fizicko-lice-novi-password
- Format: JSON
- data: {
```json
email: String* (Mora biti validan Email)
```
}

### Nova Lozinka Pranovg Lica:
- Request Type: POST
- Route: /api/auth/pravno-lice-novi-password
- Format: JSON
- data: {
```json
email: String* (Mora biti validan Email)
```
}

### Promjena Lozinke Fizickog Lica:
- Request Type: POST
- Route: /api/auth/fizicko-lice-promjena-passworda
- Format: JSON
- data: {
```json
email: String*,
oldPassword: String*,
newPassword: String*
```
}

### Promjena Lozinke Pravnog Lica:
- Request Type: POST
- Route: /api/auth/pravno-lice-promjena-passworda
- Format: JSON
- data: {
```json
email: String*,
oldPassword: String*,
newPassword: String*
```
}

## Requestovi za Fizicko Lice (KorisnickoIme fizickog lica):
### Historija Saradnji:
- Request Type: GET
- Route: /api/fizicko/historija-saradnji/{korisnickoIme}
- Response: JSON

### Ponude Poslova:
- Request Type: GET
- Route: /api/fizicko/ponude-poslova/{korisnickoIme}
- Response: JSON

### Pristigle Ponude:
- Request Type: GET
- Route: /api/fizicko/pristigle-ponude/{korisnickoIme}
- Response: JSON

### Posalji Zahtjev:
- Request Type: POST
- Route: /api/fizicko/posalji-zahtjev
- Format: JSON
- data: {
```json
emailPravnogLica: String*,
emailFizickoLica: String*,
imeFizickogLica: String*,
kontaktFizickogLica: String*,
poruka: String*
```
}

## Requestovi za Pravno Lice (KorisnickoIme pravnog lica):
### Historija Saradnje:
- Request Type: GET
- Route: /api/pravno/historija-saradnje/{korisnickoIme}
- Response: JSON

### Najprofitabilniji Klijenti:
Reqeust Type: GET,
- Route: /api/pravno/najprofitabilniji-klijenti/{korisnickoIme}
- Response: JSON

### Pristigli Zahtjevi:
- Request Type: GET
- Route: /api/pravno/pristigli-zahtjevi/{korisnickoIme}
- Response: JSON

## Logo:
- (backend url default je http://localhost:8080/)/{ime slike koju dobijate u requestu za pravno lice.}

##Vazno: 
- Ovo je prva verzija backenda pa je ocekivano da ce biti dosta BUGOVA, ukoliko naidete na neki prijavite mi na slack i molim vas da budete strpljivi. :) 
- Ukoliko ima nekih nejasnoca sa dokumentacijom obratite mi se na slack.e 
- Dosta stvari sam promjenuo sto se kaze zadnju sekundu pa ako nesto bude pokvareno prijavite mi na slack.

##Bugovi: 
- Logotipi koji su spaseni u storage-u se nece obrisati nikad. 
- Account se moze napraviti na ne postojeci email. 
- Novi password nece raditi ukoliko je korisnik napravljen na ne postojecem emailu. 
- Email za novi pasword nema nikakav design. 
- Response message ne posjeduje slova š,đ,ž,č,ć. 
- Vjerovatno ima dosta nekonzistentnog pisanja u responsu.
