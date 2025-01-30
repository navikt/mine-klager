# Mine Klager
En innsynsløsning for klager og anker i Nav klageinstans.

## Utvikling

1. Installer avhengigheter
```bash
bun i
```

2. Start utviklingsserver
```bash
bun dev
```

3. Åpne [http://localhost:3000](http://localhost:3000) i nettleseren.

## Token-generering
Logg inn i dev med riktig bruker, og besøk https://tokenx-token-generator.intern.dev.nav.no/api/obo?aud=dev-gcp:klage:{NAVN_PÅ_API}, 
for eksempel https://tokenx-token-generator.intern.dev.nav.no/api/obo?aud=dev-gcp:klage:kabal-api

Mer info her: https://docs.nais.io/auth/tokenx/how-to/generate
