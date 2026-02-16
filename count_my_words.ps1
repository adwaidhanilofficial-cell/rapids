
$content = Get-Content "draft_blog.md" -Raw
$words = $content.Split(" `t`n`r", [System.StringSplitOptions]::RemoveEmptyEntries)
Write-Output "Word count: $($words.Count)"
