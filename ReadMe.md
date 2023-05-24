Jag har utvecklat en API-webbplats som är helt dedikerad åt filmer. Min API, "FilmNördar", är en enkel film-sökwebbplats som tillåter användare att söka efter en film och få en kort beskrivning samt annan information om den önskade filmen. Jag skapade webbplatsen eftersom jag själv älskar filmer och regelbundet tittar på både de senaste och äldre filmerna. Mitt fokus har varit på sökrutan i mitten av webbplatsen. Sökrutan är ett verktyg som används för att söka efter filmer baserat på deras namn och titel. Sökrutan visar inte bara en film, utan flera filmer som har samma eller liknande namn/titlar som den sökta filmen. Resultaten från sökningen visas med bilder och år, vilket hjälper användaren att hitta rätt film.

Min webbplats har också en footer med information om FilmNördar, inklusive kontaktinformation och en sammanfattning av vad webbplatsen handlar om. Mina funktionaliteter är "sökning och filtrering av data" samt "visualisering och presentation". Med sökfunktionen kan användaren söka efter vilken film som helst, och webbplatsen filtrerar resultatet baserat på filmtiteln - det fungerar som en filterfunktion. Sökfunktionen använder även bilder och år för att presentera och visualisera den valda filmen.

Min API kommer från https://www.omdbapi.com och är en gratis och mycket användbar API. Den här API:en innehåller information om många filmer, inklusive skådespelare, regissörer, år och handling. API:en är gratis att använda, men kräver att man ansöker om en nyckel som sedan måste aktiveras för att få tillgång till all data. API:ens funktioner är omfattande och inkluderar allt jag nämnt hittills. Dessutom kan man själv välja vilka specifikationer man vill använda på sin webbplats. Jag valde bara att inkludera några av de olika specifikationerna som kan visas för filmerna men jag kan alltid inklidiera mer som t.ex belöningsvinnande eller språk på filmen. 


Här kommer några delar av koden som kanske behöver mer information on: 


"async function loadMovies(searchTerm)"

Funktionen loadMovies är en asynkron funktion som används för att ladda filmer från API:et baserat på en sökterm. Den tar emot söktermen som en parameter och skapar en URL baserat på söktermen. 

"function displayMovieList(movies)"

Funktionen displayMovieList tömmer searchList och skapar HTML-element för varje film i listan. Filmens affisch och information läggs till i elementet och elementet läggs sedan till i searchList. Funktionen avslutas med att anropa loadMovieDetails() för att ladda filmens detaljer vid klick.

"function loadMovieDetails()"

Funktionen loadMovieDetails hämtar alla filmer i searchList och lägger till en klickhändelse för varje film. Vid klick göms söklistan, återställs sökfältet och en API-förfrågan görs för att hämta filmens detaljer. De erhållna detaljerna visas sedan genom att anropa displayMovieDetails.

"function findMovies()"

Funktionen findMovies hämtar söktermen från sökfältet och trimmar den. Om söktermen är längre än 0 tecken, visar den söklistan och anropar loadMovies med söktermen. Annars göms söklistan.


"function displayMovieDetails(details)"

Funktionen displayMovieDetails uppdaterar innehållet i resultGrid med detaljer om en film. Den skapar HTML-element och fyller dem med relevant information från details-objektet, såsom filmaffisch, titel, år, genre, författare, skådespelare och handling. Det resulterande HTML-innehållet sätts sedan in i resultGrid.

"window.addEventListener"

Detta eventlyssnare lyssnar på klickhändelser på hela webbsidan. Om klicket inte kommer från ett element med klassen "form-control", så lägger den till klassen "hide-search-list" på searchList, vilket döljer söklistan.