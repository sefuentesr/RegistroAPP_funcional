import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQrPage {
  scannedData: string | null = null;
  errorMessage: string | null = null;
  toastCtrl: any;

  constructor(private alertCtrl: AlertController, private router: Router) {}

  async startScan() {
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });

      if (status.granted) {
        document.body.classList.add('scanner-active');

        const result = await BarcodeScanner.startScan();

        document.body.classList.remove('scanner-active');

        if (result.hasContent) {
          this.scannedData = result.content; 
          this.registerAttendance(this.scannedData);
        } else {
          this.errorMessage = 'No se detectó ningún código.';
        }
      } else {
        this.errorMessage = 'No se tienen permisos para usar la cámara.';
      }
    } catch (error) {
      this.errorMessage = 'Ocurrió un error al escanear el código.';
      console.error(error);
    }
  }

  private async registerAttendance(data: string) {
    const email = 'docente@institucion.edu'; 
    const subject = 'Registro de Asistencia';
    const body = `Estimado docente,
  
  Se ha registrado la asistencia del alumno con los siguientes datos:
  ${data}
  
  Fecha y hora del registro: ${new Date().toLocaleString()}
  
  Atentamente,
  Sistema de Asistencia`;
  
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  
    const alert = await this.alertCtrl.create({
      header: 'Asistencia registrada',
      message: 'Se registró la asistencia y se está preparando el envío de correo.',
      buttons: [
        {
          text: 'Enviar Correo',
          handler: () => {
            window.location.href = mailtoUrl; 
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });
    await alert.present();
    this.router.navigate(['/home']); 
  }
  private async showSuccessMessage() {
    const toast = await this.toastCtrl.create({
      message: 'El correo se ha preparado exitosamente.',
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
}