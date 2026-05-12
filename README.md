# oo2026
Objektorienteeritud programmeerimise kursus kevadsemestril 2026

Kodutööde tabel: 
https://docs.google.com/spreadsheets/d/16xQ_XEmIlkP7xOEZNedCngponatZCDN-3pk6w-T79Mc/edit?usp=sharing

Videokohtumise link:
https://meet.google.com/qem-qzwj-wqi

Videosalvestused:
https://drive.google.com/drive/folders/17KUv81-0Ja260qqGuoNtfrpUTVlA0LqH?usp=sharing

Eksam on Jaagupiga. Peate tulema koodilõiguga suveprojektist (vabalt valitud keeles). Jaagup palub koodis muudatusi teha.

Hinne kujuneb kontrolltööde põhjal.

Kõik eelnevad kodutööd peavad olema esitatud kontrolltöö ajaks.

Uue projekti tegemiseks: 
https://start.spring.io/#!type=maven-project&language=java&platformVersion=4.0.2&packaging=jar&configurationFileFormat=properties&jvmVersion=21&groupId=ee.SINU_NIMI&artifactId=PROJEKTI_NIMI&name=PROJEKTI_NIMI&description=Kirjeldus&packageName=ee.SINU_NIMI.PROJEKTI_NIMI&dependencies=lombok,web,data-jpa,h2,postgresql

Front-endi repo: https://github.com/vahermihkel/oo2026-frontend

## Minu kodutööde ülevaade

| # | Kaust | Mis tehtud | Õpieesmärk |
|---|-------|-----------|------------|
| 1 | [01_andmemudelid](./01_06.02-andmemudelid) | **Filmipood** — Spring Boot rakendus filmide haldamiseks | Andmemudeli põhi: `@Entity`, `JpaRepository`, REST kontroller, GET endpoint |
| 2 | [02_veateated](./02_13.02-veateated) | **Cars** — autode haldamine veatöötlusega | Globaalne `@ExceptionHandler` ja `ErrorMessage` DTO |
| 3 | [03_klassikomplekt](./03_20.02-klassikomplekt) | **Decathlon back-end** — sportlased + tulemused | `@OneToMany` suhe, Service kiht, Erki Nooli punktivalemid |
| 4 | [04_proovikontrolltöö 1](./04_27.02-proovikontrolltoo1) | **Rentalstore** — filmide rentimine ja tagastamine | Esimene proovikontrolltöö: CRUD + rendiarvestus + late fee. `RentalService` koos `@Transactional`-iga |
| 5 | [05_kontrolltöö 1](./05_06.03-kontrolltoo1) | Esimene kontrolltöö | Hindeline esimene kontrolltöö |
| 6 | [06_front-end](./06_13.03-front-end) | **Decathlon front-end** (React + Vite + TS + Tailwind) | Esimene front-end: sportlaste lisamine/kustutamine, tulemuste sisestus, DELETE endpoint back-endis |
| 7 | [07_deploy](./07_20.03-deploy) | Serverisse üleslaadimise juhend | Rakenduse deploy ettevalmistus |
| 10 | [10_pagination](./10_10.04-pagination) | **Decathlon + paginatsioon, filter, sort** | Spring `Pageable`, riigi järgi filter, sort arvutatud kogupunkti järgi (JPQL + `SUM(r.points)`) |
| 11 | [11_post-päringud](./11_17.04-post-päringud) | POST päringutega sportlaste ja tulemuste lisamine | POST request workflow front-endist back-endi |
| 12 | [12_päringud-rakendusest-välja](./12_24.04-päringud-rakendusest-välja) | **Kohtunike + asukohtade API** | `RestTemplate` ja `mockapi.io` välised andmeallikad, `@Value`-ga URL-id `application.properties`-ist |
| 13 | [13_proovikontrolltöö 2](./13_08.05-proovikontrolltoo2) | **LibraryManagement** (raamatukogu) | Teine proovikontrolltöö: batch-add endpoint (`POST /api/books/add-multiple`) + paginatsioon |
| 14 | [14_kontrolltöö 2](./14_15.05-kontrolltoo2) | Ootab 15.05.2026 | Hindeline teine kontrolltöö |
| 15 | [15_eksam](./15_eksam_jaagupiga) | Ootab eksamit | Eksam Jaagupiga (suveprojektist koodilõik) |

> Iga kausta sees on iseseisev projekt — back-end (Spring Boot) ja vajadusel ka front-end (React). Iga kodutöö ehitub eelmise peale, kuid on samas täiesti standalone — eelmist ei muudeta.

