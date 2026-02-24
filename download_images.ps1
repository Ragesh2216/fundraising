New-Item -ItemType Directory -Force -Path "images" | Out-Null

$images = @{
    "about-mission.webp"    = "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop&fm=webp&q=80"
    "team-john.webp"        = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=faces&fm=webp&q=80"
    "team-jane.webp"        = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&fm=webp&q=80"
    "team-mike.webp"        = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&fm=webp&q=80"
    "campaign-forest.webp"  = "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=300&fit=crop&fm=webp&q=80"
    "campaign-hunger.webp"  = "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=300&fit=crop&fm=webp&q=80"
    "campaign-edu.webp"     = "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop&fm=webp&q=80"
    "campaign-water.webp"   = "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop&fm=webp&q=80"
    "campaign-medical.webp" = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop&fm=webp&q=80"
    "campaign-housing.webp" = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop&fm=webp&q=80"
    "sc-hero.webp"          = "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&h=1080&fit=crop&fm=webp&q=80"
    "sc-library.webp"       = "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=300&fit=crop&fm=webp&q=80"
    "sc-medical.webp"       = "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=300&fit=crop&fm=webp&q=80"
    "sc-ocean.webp"         = "https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=400&h=300&fit=crop&fm=webp&q=80"
}

$client = New-Object System.Net.WebClient
$client.Headers.Add("User-Agent", "Mozilla/5.0")

foreach ($name in $images.Keys) {
    $url  = $images[$name]
    $dest = "images\$name"
    Write-Host "Downloading $name ..."
    try {
        $client.DownloadFile($url, $dest)
        $kb = [math]::Round((Get-Item $dest).Length / 1KB, 1)
        Write-Host "  OK  $name  ($kb KB)"
    } catch {
        Write-Host "  FAILED $name : $_"
    }
}

Write-Host ""
Write-Host "All downloads complete. Files saved to images/ folder."
