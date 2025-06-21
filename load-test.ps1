param(
    [string]$url = "http://localhost:5000/health-check",
    [int]$requests = 100,
    [int]$concurrency = 10
)

function Invoke-LoadTest {
    $jobs = @()

    for ($i = 0; $i -lt $requests; $i++) {
        $jobs += Start-Job -ScriptBlock {
            param($url)
            try {
                $start = Get-Date
                $response = Invoke-WebRequest -Uri $url -UseBasicParsing
                $end = Get-Date
                $duration = ($end - $start).TotalMilliseconds
                Write-Output "[$($response.StatusCode)] Time: $duration ms"
            } catch {
                Write-Output "[ERROR] $_"
            }
        } -ArgumentList $url

        if (($i + 1) % $concurrency -eq 0) {
            Get-Job | Wait-Job
            Get-Job | Receive-Job
            Get-Job | Remove-Job
        }
    }

    # Clean up any remaining jobs
    Get-Job | Wait-Job
    Get-Job | Receive-Job
    Get-Job | Remove-Job
}

Invoke-LoadTest
