import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
  private ninjas = [
    {
      id: 1,
      name: 'Ryu',
      rank: 'black-belt',
      age: 30,
    },
    {
      id: 2,
      name: 'Yoshi',
      rank: 'orange-belt',
      age: 20,
    },
  ];

  getNinjas(rank?: 'black-belt' | 'orange-belt') {
    if (rank) {
      return this.ninjas.filter((ninja) => ninja.rank === rank);
    }
    return this.ninjas;
  }

  getNinja(id: number) {
    const ninja = this.ninjas.find((ninja) => ninja.id === id);
    if (!ninja) {
      throw new Error('Ninja not found');
    }
    return ninja;
  }

  createNinja(input: CreateNinjaDto) {
    const id = this.ninjas.length + 1;
    const newNinja = {
      id,
      ...input,
    };
    this.ninjas.push(newNinja);
    return newNinja;
  }

  updateNinja(id: number, input: UpdateNinjaDto) {
    this.ninjas = this.ninjas.map((ninja) => {
      if (ninja.id === id) {
        return {
          ...ninja,
          ...input,
        };
      }
      return ninja;
    });
  }

  deleteNinja(id: number) {
    const ninja = this.getNinja(id);
    this.ninjas = this.ninjas.filter((ninja) => ninja.id !== id);
    return ninja;
  }
}
