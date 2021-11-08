
import { BaseRepository } from '@tomuench/vetprovieh-shared/lib';
import { Document } from '../models/';
import { v4 as uuidv4 } from 'uuid';
import { resolvePlugin } from '@babel/core';

export class DocumentRepository extends BaseRepository<Document> {
  constructor() {
    super('/service/upload/uploadFile');
  }


  private _barnId = '';
  public get barnId(): string {
    return this._barnId;
  }

  public set barnId(v: string) {
    this._barnId = v;
  }

  /**
   * Downloading Image/video to local blob
   */
  public download(url: string): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      fetch(url).then((result) => {
        result.blob().then((blob) => {
          resolve(URL.createObjectURL(blob));
        }).catch((error) => reject(error))
      }).catch((error) => reject(error))
    });
  }

  /**
   * Downloading a file and open it
   * @param {string} id 
   */
  public downloadAndOpen(id: string) {
    this.download(`${this.endpoint}/${id}`).then((result) => {
      if(result){
        window.open(result, "_blank");
      }
    })
  }

  /**
   * Getting All
   * @return Promise<T[]>
   */
  all(): Promise<Document[]> {
    return fetch(`${this.endpoint}/barn/${this.barnId}`).then((response) => {
      if (response.status === 404) {
        return [];
      }
      return response.json();
    });
  }

  create(document: Document): Promise<any> {
    return new Promise((resolve, reject) => {
      if (document.id == undefined) {
        document.id = DocumentRepository.generateUUID();
        const requestData = this.buildRequestdata(document);
        fetch(this.endpoint, {
          method: 'POST',
          headers: {

          },
          body: requestData,
        }).then((response) => {
          let location = response.headers.get('location') || '';
          location = location?.substr(location.lastIndexOf('/') + 1);
          resolve(`/service/upload/uploadFile/${location}`);
        })
          .catch((e) => reject(false));
      }
    });
  }


  /**
   * Building FormData to send
   * @param {Document} document
   */
  private buildRequestdata(document: Document): FormData {
    const formData = new FormData();
    formData.append('barnId', (document.barnId as number).toString());
    if (document.content) formData.append('file', document.content);
    formData.append('fileName', document.name as string);
    formData.append('id', document.id as string);
    return formData;
  }

  /**
   * Generating a UUID
   * @return {string}
   */
  public static generateUUID(): string {
    return uuidv4();
  }
}
