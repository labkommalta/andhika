@echo off
chcp 65001 > nul
echo ================================================================
echo  UPLOAD WEBSITE MAS AL-ITTIHAD TAWANGSARI KE GITHUB
echo  Target: https://github.com/labkommalta/andhika.git
echo ================================================================
echo.

cd /d "%~dp0"

echo Menambahkan seluruh file...
git add .

echo.
echo Melakukan commit...
git commit -m "feat: sinkronisasi lengkap frontend dan backend MAS Al-Ittihad Tawangsari" > nul 2>&1

echo.
echo Mengunggah ke GitHub (origin main)...
echo Jika diminta Password, masukkan GitHub Personal Access Token (PAT) Anda.
echo.
git push origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo ================================================================
    echo  BERHASIL! Seluruh file telah terupload ke:
    echo  https://github.com/labkommalta/andhika
    echo.
    echo  Langkah selanjutnya: Buka https://vercel.com/new dan deploy repo ini!
    echo ================================================================
) else (
    echo ================================================================
    echo  GAGAL UPLOAD!
    echo  Catatan GitHub: Saat ini GitHub mewajibkan Personal Access Token (PAT)
    echo  sebagai pengganti password biasa.
    echo  Buat token di: https://github.com/settings/tokens
    echo ================================================================
)

echo.
pause
