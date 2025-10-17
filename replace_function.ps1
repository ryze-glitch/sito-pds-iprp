# Leggi il file originale
$originalFile = "sito_test.html"
$newFunctionFile = "new_login_function.txt"
$outputFile = "sito_test_new.html"

# Leggi tutti i contenuti
$lines = Get-Content $originalFile -Encoding UTF8
$newFunction = Get-Content $newFunctionFile -Encoding UTF8

# Crea il nuovo contenuto
$before = $lines[0..6606]
$after = $lines[7852..($lines.Length-1)]

# Combina
$newContent = $before + $newFunction + $after

# Scrivi il risultato
$newContent | Set-Content $outputFile -Encoding UTF8

# Sostituisci il file originale
Move-Item $outputFile $originalFile -Force

Write-Host "Sostituzione completata!"

