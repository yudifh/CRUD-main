import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import axios from 'axios';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public npm:any = "";
  public nama_mahasiswa:any = "";
  public jenis_kelamin:any = "";
  public jurusan:any = "";
  public foto_siswa:any = "";

  constructor(
    public toastctrl: ToastController,
  ) {}

  async imageUpload(event) {
    console.log(event);
    const file = event.target.files[0];
    this.foto_siswa = file;
  }

  async addData() {
    const formData = new FormData();
    formData.append('npm', this.npm);
    formData.append('nama_mahasiswa', this.nama_mahasiswa);
    formData.append('jenis_kelamin', this.jenis_kelamin);
    formData.append('jurusan', this.jurusan);
    formData.append('foto_siswa', this.foto_siswa);
    console.log(formData);

    try{
      const res = await axios.post('http://localhost/tutorial/api/post_data.php', formData);
      console.log(res.data);

      if(res.data.error == false) {
        const toast = await this.toastctrl.create({
          message: 'Data berhasil ditambahkan',
          duration: 2000
        });
        toast.present();
      }

      }catch(err){
        console.log(err);
      }

    }
}
