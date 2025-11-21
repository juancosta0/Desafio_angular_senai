@echo off
echo ========================================
echo    INICIANDO PROJETO FORD DASHBOARD
echo ========================================
echo.

echo [1/4] Navegando para o backend...
cd back

echo [2/4] Instalando dependências do backend...
call npm install

echo [3/4] Iniciando servidor do backend em segundo plano...
start cmd /k "npm start"

echo [4/4] Aguardando 5 segundos e iniciando frontend...
timeout /t 5
cd ../front
call npm install
echo.
echo ========================================
echo    BACKEND INICIADO EM: http://localhost:3001
echo    FRONTEND INICIADO EM: http://localhost:4200
echo ========================================
echo.
echo PARA TESTAR:
echo 1. Acesse http://localhost:4200
echo 2. Faça login (admin/123456)
echo 3. Vá para Dashboard
echo 4. Use o campo de busca na tabela por VIN

call ng serve
