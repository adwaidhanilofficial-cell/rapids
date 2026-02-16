
param (
    [string]$FilePath
)

if (-not (Test-Path $FilePath)) {
    Write-Error "File not found: $FilePath"
    exit 1
}

$content = Get-Content $FilePath -Raw
$wordCount = ($content -split '\s+').Count

Write-Output "Word count for $FilePath : $wordCount"
$text = Get-Content 'blog-post-public-speaking-class-kerala.md' -Raw
# Remove markdown headers
$text = $text -replace '#{1,6}\s', ''
# Remove anchor ids
$text = $text -replace '\{#[^}]+\}', ''
# Remove image placement notes
$text = $text -replace '\[Image:[^\]]+\]', ''
# Remove bold markers
$text = $text -replace '\*\*', ''
# Remove italic markers
$text = $text -replace '\*', ''
# Remove horizontal rules
$text = $text -replace '---', ''
# Remove links but keep text: [text](url) -> text
$text = $text -replace '\[([^\]]+)\]\([^\)]+\)', '$1'
# Remove bullet markers
$text = $text -replace '(?m)^\s*[-*]\s+', ''
# Remove numbered list markers
$text = $text -replace '(?m)^\s*\d+\.\s+', ''
# Remove remaining markdown syntax
$text = $text -replace '[|>`]', ''
# Collapse whitespace
$text = $text -replace '\s+', ' '
$words = $text.Trim().Split(' ', [System.StringSplitOptions]::RemoveEmptyEntries)
Write-Host "Word count: $($words.Count)"
