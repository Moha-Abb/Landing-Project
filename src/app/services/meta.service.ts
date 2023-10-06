import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { MetaTags } from '../inerfaces/metatags.model';
@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private setTitle(title: string) {
    this.meta.updateTag({ property: 'og:title', content: title });
  }

  private setType(type: string) {
    this.meta.updateTag({ property: 'og:type', content: type });
  }

  private setImage(imageSrc: string) {
    this.meta.updateTag({ property: 'og:image', content: imageSrc });
  }

  private setUrl(url: string) {
    this.meta.updateTag({ property: 'og:url', content: url });
  }

  private setDescription(description: string) {
    this.meta.updateTag({ property: 'og:description', content: description });
  }

  private setCardType(cardType: string) {
    this.meta.updateTag({ name: 'twitter:card', content: cardType });
  }
  constructor(
    private meta: Meta,
  ) { }
  updateMetaTags(metaTags: MetaTags) {
    const { title, type, imageSrc, url, description, cardType } = metaTags;

    if (title) {
      this.setTitle(title);
    }
    if (type) {
      this.setType(type);
    }
    if (imageSrc) {
      this.setImage(imageSrc);
    }
    if (url) {
      this.setUrl(url);
    }
    if (description) {
      this.setDescription(description);
    }
    if (cardType) {
      this.setCardType(cardType);
    }
  }
}