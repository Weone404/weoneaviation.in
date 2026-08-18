Add-Type -AssemblyName System.Drawing

$path = 'D:\weoneaviation.in\public\og-cover.jpg'
$width = 1200
$height = 630

$img = New-Object System.Drawing.Bitmap($width, $height)
$g = [System.Drawing.Graphics]::FromImage($img)
$g.Clear([System.Drawing.Color]::FromArgb(10,35,66))

$blue = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(31,79,124))
$g.FillRectangle($blue, 0, 0, 600, 430)

$orange = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(180,83,9))
$g.FillRectangle($orange, 0, 430, 1200, 200)

$titleFont = [System.Drawing.Font]::new('Arial', 52, [System.Drawing.FontStyle]::Bold)
$bodyFont = [System.Drawing.Font]::new('Arial', 26, [System.Drawing.FontStyle]::Regular)
$white = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::White)
$orangeText = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255,184,77))

$g.DrawString('WE ONE AVIATION', $titleFont, $white, 80, 120)
$g.DrawString('Best Pilot Training Institute in India', $bodyFont, $white, 80, 210)
$g.DrawString('CPL • PPL • ATPL • DGCA', $bodyFont, $orangeText, 80, 282)

$img.Save($path, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$g.Dispose()
$img.Dispose()

Write-Host "created=$path"
Write-Host "width=$width height=$height"
Get-Item $path | Select-Object FullName, Length
