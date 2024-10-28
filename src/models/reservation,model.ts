import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne 
} from 'typeorm';
import { User } from './user.model';
import { Doctor } from './doctor.model';

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.reservations, { eager: true })
    user: User;

    @ManyToOne(() => Doctor, (doctor) => doctor.reservations, { eager: true })
    doctor!: Doctor;

    @Column('date')
    date: string;

    @Column('time')
    time: string;
}
