$baseUrl = "http://localhost:3000"

function Login-User {
  param (
    [string]$username,
    [string]$password
  )

  $body = @{
    username = $username
    password = $password
  } | ConvertTo-Json

  $response = Invoke-RestMethod -Method POST `
    -Uri "$baseUrl/login" `
    -ContentType "application/json" `
    -Body $body

  return $response
}

function Create-Item {
  param (
    [string]$token,
    [string]$nombre
  )

  $body = @{
    nombre = $nombre
    descripcion = "Creado automáticamente desde PowerShell"
    estado = $true
  } | ConvertTo-Json

  Invoke-RestMethod -Method POST `
    -Uri "$baseUrl/api/items" `
    -Headers @{ Authorization = "Bearer $token" } `
    -ContentType "application/json" `
    -Body $body
}

# Cambia aquí el usuario que quieres probar
$user = "dragon"
$pass = "123456"

$login = Login-User -username $user -password $pass
$token = $login.token

Write-Host "Usuario:" $user
Write-Host "Rol:" $login.role
Write-Host "Token generado automáticamente"

Create-Item -token $token -nombre "Item creado por $user"