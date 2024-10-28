import { 
    Entity, 
    PrimaryGeneratedColumn,
    Column, 
    OneToMany 
    } from 'typeorm';
import { Reservation } from './reservation,model';

@Entity()
export class Doctor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    specialty: string;

    @Column()
    availableDays: string; // e.g., "Lunes, Miércoles, Viernes"

    @OneToMany(() => Reservation, (reservation) => reservation.doctor)
    reservations: Reservation[];
}
