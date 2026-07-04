Add-Type -AssemblyName System.IO.Compression.FileSystem
$doc = 'D:\weoneaviation.in\We_One_Aviation_Pilot_Course.docx'
$zip = [System.IO.Compression.ZipFile]::OpenRead($doc)
$entry = $zip.GetEntry('word/document.xml')
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream)
$xml = $reader.ReadToEnd()
$reader.Dispose()
$stream.Dispose()
$zip.Dispose()
[xml]$x = $xml
$ns = New-Object System.Xml.XmlNamespaceManager($x.NameTable)
$ns.AddNamespace('w', 'http://schemas.openxmlformats.org/wordprocessingml/2006/main')
foreach($p in $x.SelectNodes('//w:p', $ns)) {
  $text = ''
  foreach($t in $p.SelectNodes('.//w:t', $ns)) { $text += $t.InnerText }
  if($text.Trim() -ne '') { Write-Output $text }
}
