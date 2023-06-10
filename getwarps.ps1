#Edited version of starrailstation.com's method
Add-Type -AssemblyName System.Web
$ProgressPreference = 'SilentlyContinue'

#Find Game
Write-Output "Finding game..."

$appData = [Environment]::GetFolderPath("ApplicationData")
$logPath = "$appData\..\LocalLow\Cognosphere\Star Rail\Player.log"
$logContent = Get-Content $logPath #-First 1).replace("Loading player data from ", "").replace("/data.unity3d", "")
$gamePath = ""

for ($i = $logContent.Length - 1; $i -ge 0; $i--) {
    $line = $logContent[$logContent.Length -$i]
    
    if ($line -and $line.startsWith("Loading player data from")) {
        $gamePath = $line.replace("Loading player data from ", "").replace("/data.unity3d", "")
        break
    }
}

if ($gamePath -ne "") {
    #Find Gacha Url
    Write-Output "Finding Gacha Url..."
    Copy-Item -Path "$gamePath/webCaches/Cache/Cache_Data/data_2" -Destination "$gamePath/webCaches/Cache/Cache_Data/data_2_copy"
    $cacheData = Get-Content -Encoding UTF8 -Raw "$gamePath/webCaches/Cache/Cache_Data/data_2_copy"
    Remove-Item -Path "$gamePath/webCaches/Cache/Cache_Data/data_2_copy"
    $cacheDataLines = $cacheData -split '1/0/'
    $foundUrl = "false"

    for ($i = $cacheDataLines.Length - 1; $i -ge 0; $i--) {
        $line = $cacheDataLines[$i]

        if ($line.StartsWith('http') -and $line.Contains("getGachaLog")) {
            $url = ($line -split "\0")[0]

            $response = Invoke-WebRequest -Uri $url -ContentType "application/json" -UseBasicParsing | ConvertFrom-Json

            if ($response.retcode -eq 0) {
                Write-Output $url
                Set-Clipboard -Value $url
                Write-Output "Warp History Url has been saved to clipboard."
                $foundUrl = "true"
                return
            }
        }
    }

    if ($foundUrl -eq "false") {
        Write-Output "Unable to find Gacha Url. Please open warp history in-game."
    }
} else {
    Write-Output "Unable to find Game Path. Please try re-opening the game."
}