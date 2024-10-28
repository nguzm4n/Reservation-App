import { 
    Entity,
    PrimaryGeneratedColumn,
    Column, 
    OneToMany 
    } from 'typeorm';
import { Reservation } from './reservation,model';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    verificationCode: string;

    @Column({ default: false })
    isVerified: boolean;

    @OneToMany(() => Reservation, (reservation) => reservation.user)
    reservations: Reservation[];
}
