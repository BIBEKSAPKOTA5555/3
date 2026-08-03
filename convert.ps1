Add-Type -AssemblyName System.Drawing
[System.Reflection.Assembly]::LoadWithPartialName("System.Runtime.WindowsRuntime") | Out-Null
[Windows.Data.Pdf.PdfDocument, Windows.Data.Pdf, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime] | Out-Null

$brainDir = "C:\Users\bibek\.gemini\antigravity-ide\brain\45276112-4a9c-49a3-9fdc-6b5369c5519e"
$targetDir = "a:\WEBSITE\3-main"

function Convert-PdfToJpg($pdfPath, $outPath, $pageIdx) {
    try {
        $fileTask = [Windows.Storage.StorageFile]::GetFileFromPathAsync($pdfPath)
        $asTaskMethod = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.IsGenericMethodDefinition } | Select-Object -First 1
        $fileTaskConverted = $asTaskMethod.MakeGenericMethod([Windows.Storage.StorageFile]).Invoke($null, @($fileTask))
        $fileTaskConverted.Wait()
        $file = $fileTaskConverted.Result

        $docTask = [Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($file)
        $docTaskConverted = $asTaskMethod.MakeGenericMethod([Windows.Data.Pdf.PdfDocument]).Invoke($null, @($docTask))
        $docTaskConverted.Wait()
        $doc = $docTaskConverted.Result

        $page = $doc.GetPage($pageIdx)
        $stream = New-Object Windows.Storage.Streams.InMemoryRandomAccessStream

        $renderTask = $page.RenderToStreamAsync($stream)
        $asTaskActionMethod = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and -not $_.IsGenericMethodDefinition -and $_.GetParameters().Length -eq 1 } | Select-Object -First 1
        $renderTaskConverted = $asTaskActionMethod.Invoke($null, @($renderTask))
        $renderTaskConverted.Wait()

        $netStream = [System.IO.WindowsRuntimeStreamExtensions]::AsStreamForRead($stream)
        $img = [System.Drawing.Image]::FromStream($netStream)
        $img.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)

        $img.Dispose()
        $netStream.Dispose()
        $stream.Dispose()
        $page.Dispose()
        Write-Host "SUCCESS: Saved $outPath"
    }
    catch {
        Write-Host "FAILED: $_"
    }
}

Convert-PdfToJpg "$brainDir\media__1785619342020.pdf" "$targetDir\passport.jpg" 0
Convert-PdfToJpg "$brainDir\media__1785619341665.pdf" "$targetDir\class12-marksheet.jpg" 0
Convert-PdfToJpg "$brainDir\media__1785619341665.pdf" "$targetDir\class12-transcript.jpg" 1
