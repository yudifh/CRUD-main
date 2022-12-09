import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import axios from 'axios';
import { Tab3Page } from '../tab3/tab3.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public mahasiswaData:any=[];
  public npm:any = "";
  public nama_mahasiswa:any = "";
  public jenis_kelamin:any = "";
  public jurusan:any = "";
  public foto_siswa:any = "";

  constructor(
    public modalCtrl : ModalController,
  ) {
    this.getData();
  }

  async getData() {
    try{
      const res = await axios.get('http://localhost/tutorial/api/get_data_mahasiswa.php');
      this.mahasiswaData = res.data.result;
      console.log(this.mahasiswaData);
    }catch(err) {
      console.log(err);
    }
  }

  async deleteData(id) {
    const fd = new FormData();
    fd.append('id', id);
    try{
      const res = await axios.post('http://localhost/tutorial/api/delete_data_mahasiswa.php', fd);
      if(res.data.success == false) {
        alert('Gagal menghapus data');
      } else {
        alert('Berhasil menghapus data');
        this.getData();
      }
    }catch(err) {
      console.log(err);
    }
  }

  async getDataMahasiswa(id) {
    console.log(id);
    const modal = await this.modalCtrl.create({
      component: Tab3Page,
      componentProps: {
        "id": id
      }
    });
    return await modal.present();
  }
}