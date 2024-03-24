# 💯 Linker Backend Documentation 💯

## ❗️ Važno: ❗️ 
- Ovo je prva verzija backenda pa je očekivano da će biti dosta BUGOVA, ukoliko naiđete na neki, prijavite mi na Slack i molim vas da budete strpljivi. :)
- Ukoliko ima nekih nejasnoća s dokumentacijom, obratite mi se na Slack.
- Dosta stvari sam promijenio u zadnji trenutak pa ako nešto bude pokvareno, prijavite mi na Slack.
- Simbol * pored neke riječi "pretežno String" znači da je field obavezno popuniti.
- Na Slacku ćete dobiti .env datoteku.

## ▶️ Autorizacija ◀️
- Kako ne bi mogao svatko poslati zahtjev i mijenjati podatke u našoj bazi podataka, postavio sam autorizacijski token koji se mora poslati s svakim zahtjevom.
- U zaglavljima postavite token koji ćete dobiti na Slacku. Bez tog tokena dobit ćete grešku "Missing token."

## ▶️ Auth Requests ◀️
### 👉🏼 Registracija Fičickog Lica:
- Request Type: POST
- Route: /api/auth/register-fizickog-lica
- Format: JSON
- data: 
```json
"ime": "String*",
"prezime": "String*",
"telefon": "String*",
"email": "String* (OVO MORA BITI JEDINSTVENO)",
"korisnickoIme": "String* (OVO MORA BITI JEDINSTVENO)",
"password": "String*"
```

### 👉🏼 Registracija Pravnog Lica:
- Request Type: POST
- Route: /api/auth/register-pravnog-lica
- Format: FORM-DATA
- data: 
```json
"ime": "String*",
"sjediste": "String*",
"telefon": "String*",
"IDBroj": "String*",
"djelatnost": "String*",
"email": "String* (OVO MORA BITI JEDINSTVENO)",
"korisnickoIme": "String* (OVO MORA BITI JEDINSTVENO)",
"password": "String*",
"logotip": "File",
```

### 👉🏼 Login Fizičkog Lica:
- Request Type: POST
- Route: /api/auth/login-fizickog-lica
- Format: JSON
- data: 
```json
"korisnickoIme": "String*",
"password": "String*"
```

### 👉🏼 Login Pranvnog Lica:
- Request Type: POST
- Route: /api/auth/login-fizickog-lica
- Format: JSON
- data: 
```json
"korisnickoIme": "String*",
"password": "String*"
```


### 👉🏼 Nova Lozinka Fičickog Lica:
- Request Type: POST
- Route: /api/auth/fizicko-lice-novi-password
- Format: JSON
- data: 
```json
"email": "String* (Mora biti validan Email)"
```

### 👉🏼 Nova Lozinka Pranovg Lica:
- Request Type: POST
- Route: /api/auth/pravno-lice-novi-password
- Format: JSON
- data: 
```json
"email": "String* (Mora biti validan Email)"
```

### 👉🏼 Promjena Lozinke Fičickog Lica:
- Request Type: POST
- Route: /api/auth/fizicko-lice-promjena-passworda
- Format: JSON
- data: 
```json
"email": "String*",
"oldPassword": "String*",
"newPassword": "String*"
```

### 👉🏼 Promjena Lozinke Pravnog Lica:
- Request Type: POST
- Route: /api/auth/pravno-lice-promjena-passworda
- Format: JSON
- data: 
```json
"email": "String*",
"oldPassword": "String*",
"newPassword": "String*"
```

## ▶️ Requestovi za Fizičko Lice (KorisnickoIme fizickog lica): ◀️
### 👉🏼 Historija Saradnji:
- Request Type: GET
- Route: /api/fizicko/historija-saradnji/{korisnickoIme}
- Response: JSON

### 👉🏼 Ponude Poslova:
- Request Type: GET
- Route: /api/fizicko/ponude-poslova/{korisnickoIme}
- Response: JSON

### 👉🏼 Pristigle Ponude:
- Request Type: GET
- Route: /api/fizicko/pristigle-ponude/{korisnickoIme}
- Response: JSON

### 👉🏼 Pošalji Zahtjev:
- Request Type: POST
- Route: /api/fizicko/posalji-zahtjev
- Format: JSON
- data: 
```json
"emailPravnogLica": "String*",
"emailFizickoLica": "String*",
"imeFizickogLica": "String*",
"kontaktFizickogLica": "String*",
"poruka": "String*"
```

## ▶️ Requestovi za Pravno Lice (KorisnickoIme pravnog lica): ◀️
### 👉🏼 Historija Saradnje:
- Request Type: GET
- Route: /api/pravno/historija-saradnje/{korisnickoIme}
- Response: JSON

### 👉🏼 Najprofitabilniji Klijenti:
- Reqeust Type: GET,
- Route: /api/pravno/najprofitabilniji-klijenti/{korisnickoIme}
- Response: JSON

### 👉🏼 Pristigli Zahtjevi:
- Request Type: GET
- Route: /api/pravno/pristigli-zahtjevi/{korisnickoIme}
- Response: JSON

## ▶️ Logo: ◀️
- (Backend URL po defaultu je http://localhost:8080/){ime slike koju dobijete u zahtjevu za pravno lice.}
- To bi otprilike izgledalo ovako: http://localhost:8080/1711117689880mascot-logo-design_fb-img_1200x800.jpg/

## 💣 Bugovi: 💣
- Logotipi koji su spašeni u storage-u se neće nikad obrisati.
- Account se može napraviti na nepostojeći email.
- Novi password neće raditi ukoliko je korisnik napravljen na nepostojećem emailu.
- Email za novi password nema nikakav dizajn.
- Response message ne posjeduje slova š, đ, ž, č, ć.
- Vjerojatno ima dosta nekonzistentnog pisanja u responsu.

## ❓ Nedovršeno ❓
### 👉🏼 Route: 
- Odgovori Zahtjevu.

### 👉🏼Logika
- 👉🏼 Pravno Lice:
- Historija Saradnje
- Klijenti
- 👉🏼 Fizičko Lice:
- Ponude
- Historija Saradnje
