import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.scss']
})
export class ModalImageComponent implements OnInit {

  public data         : any
  public type         : string = ''
  public active       : boolean = false
  public uploadImage! : File
  public imageTemp    : any
  //si no hay imagen cargada en el input file desabilita btn actualizar
  public disabled     : number = 0 

  private subscription$!: Subscription;

  //gestionar contenido del input file
  @ViewChild('fileInput', {static: false})
  myFileInput!: ElementRef<any>;

  constructor(private modalImageService: ModalImageService,
              private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
    this.subscription$ = this.modalImageService.modal$.subscribe(res => {
      //si la res, no es un obj vacio
      if (Object.keys(res).length !== 0) {
        this.active = true
        this.data = res.data
        this.type = res.type
      }    
    })
  }

  changeImage(event: any): void {
    //al detectar el cambio en el input obtiene la imagen seleccionada
    this.uploadImage = event.target.files[0];

    //PARA VER INSTANTANEAMENTE LA IMAGEN QUE VAMOS A GUARDAR
    
    //si cancelamos la imagen nueva, para que muestre la anterior al momento
    if(!this.uploadImage) {
      this.imageTemp = null;

    } else {
      //para construir la imagen de vista previa
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadImage);
      reader.onloadend = () => {
      this.imageTemp = reader.result;
      }
    }  
    this.disabled = this.myFileInput.nativeElement.value.length
  }

  updateImage(): void {
    this.fileUploadService.uploadImage(this.type, this.data._id, this.uploadImage)
          .subscribe({
            next: res => {          
              this.data.image = res.fileName
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Imagen actualizada!',
                showConfirmButton: false,
                timer: 2000
              }) 
              this.imageTemp = null
              this.myFileInput.nativeElement.value = ''
              this.disabled = this.myFileInput.nativeElement.value.length
              this.active = false       
            },
            error: err => Swal.fire('Error!!!', 'No se pudo subir la imagen!', 'error')
           
          })
  }

  closeModal(): void {
    this.imageTemp = null;
    this.myFileInput.nativeElement.value = '' //vaciamos el input file
    this.disabled = this.myFileInput.nativeElement.value.length
    this.active = false
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

}
