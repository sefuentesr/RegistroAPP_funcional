import { Component, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-generate-qr',
  templateUrl: './generate-qr.page.html',
  styleUrls: ['./generate-qr.page.scss'],})
export class GenerateQrPage implements OnInit {
  qrCodeData: string = '';
  qrCodeImage: string | null = null;

  constructor() {}

  ngOnInit() {
    this.qrCodeData = this.generateQRCodeData();
    this.generateQRCode(this.qrCodeData);
  }

  generateQRCodeData(): string {
    const currentDateTime = new Date().toISOString(); 
    return `Asistencia|Fecha:${currentDateTime}`;
  }

  async generateQRCode(data: string) {
    try {
      this.qrCodeImage = await QRCode.toDataURL(data);
    } catch (error) {
      console.error('Error generando el código QR', error);
    }
  }
}

