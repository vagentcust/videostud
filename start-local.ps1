$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$runtimePath = Join-Path $PSScriptRoot 'data'
New-Item -ItemType Directory -Force -Path $runtimePath | Out-Null
$nodeExecutable = (Get-Command node).Source
foreach ($service in @('server', 'bot')) {
    $pidFile = Join-Path $runtimePath "$service.pid"
    if (Test-Path -LiteralPath $pidFile) {
        $existingId = [int](Get-Content -LiteralPath $pidFile)
        $existingProcess = Get-Process -Id $existingId -ErrorAction SilentlyContinue
        if ($existingProcess -and $existingProcess.ProcessName -eq 'node') {
            Write-Output "$service already running (PID $existingId)"
            continue
        }
    }
    if ($service -eq 'server') {
        try {
            $health = & $nodeExecutable -e "fetch('http://127.0.0.1:4173/api/health',{signal:AbortSignal.timeout(2000)}).then(r=>r.json()).then(j=>console.log(j.ok?'ready':'unavailable')).catch(()=>console.log('unavailable'))"
            if ($health -eq 'ready') { Write-Output 'Local website already running'; continue }
        } catch {}
    }
    $arguments = if ($service -eq 'bot') { @('--env-file=.env', 'bot.mjs') } else { @('server.mjs') }
    $child = Start-Process -FilePath $nodeExecutable -ArgumentList $arguments -WorkingDirectory $PSScriptRoot -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $runtimePath "$service.log") -RedirectStandardError (Join-Path $runtimePath "$service.error.log")
    Set-Content -LiteralPath $pidFile -Value $child.Id
    Write-Output "$service started (PID $($child.Id))"
}
