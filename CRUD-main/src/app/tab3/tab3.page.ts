import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public mahasiswaData:any = [];
  public npm:any = "";
  public nama_mahasiswa:any = "";
  public jenis_kelamin:any = "";
  public jurusan:any = "";
  public foto_siswa:any = "";

  foto:any;
  mahasiswaId:any;

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
  ) {
    this.mahasiswaId = this.navParams.get('id');
    console.log(this.mahasiswaId);
    this.getData();
  }

  async imageUpload(event) {
    console.log(event);
    const file = event.target.files[0];
    this.foto = file;
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async getData() {
    const fd = new FormData();
    fd.append('id', this.mahasiswaId);
    try{
      const res = await axios.post('http://localhost/tutorial/api/get_data_mahasiswaId.php', fd);
      this.mahasiswaData = res.data.result;
      for(let data of this.mahasiswaData) {
        this.npm = data.npm;
        this.nama_mahasiswa = data.nama_mahasiswa;
        this.jenis_kelamin = data.jenis_kelamin;
        this.jurusan = data.jurusan;
        this.foto_siswa = data.foto_siswa;
      }
      console.log(this.mahasiswaData);
    }catch(err) {
      console.log(err);
    }
  }

  async updateData() {
    const fd = new FormData();
    fd.append('id', this.mahasiswaId);
    fd.append('npm', this.npm);
    fd.append('nama_mahasiswa', this.nama_mahasiswa);
    fd.append('jenis_kelamin', this.jenis_kelamin);
    fd.append('jurusan', this.jurusan);
    if(this.foto != undefined) {
      fd.append('foto_siswa', this.foto_siswa);
    }
    try{
      const res = await axios.post('http://localhost/tutorial/api/update_data_mahasiswa.php', fd);
      if(res.data.error == false) {
        alert('Berhasil mengupdate data');
        this.dismiss();
        this.navCtrl.navigateRoot('/tabs/tab1');
      } else {
        alert('Gagal mengupdate data');
      }
      this.getData();
    }catch(err) {
      console.log(err);
    }
    
  }

}
