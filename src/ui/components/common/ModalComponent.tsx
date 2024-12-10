// components/Modals/CharacterDetailModal.tsx
import React from 'react';
import {
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody,
  Button,
  Card,
  CardBody,
  Chip
} from "@nextui-org/react";
import { UserCircle, Ruler, Weight, Calendar, Palette, Eye } from 'lucide-react';

interface ModalComponent {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode
  name?: string
  // character: {
  //   name: string;
  //   height: string;
  //   mass: string;
  //   birth_year: string;
  //   eye_color: string;
  //   gender: string;
  //   hair_color: string;
  //   skin_color: string;
  //   [key: string]: any; // for other potential properties
  // } | null;
}

export default function ModalComponent({
  isOpen,
  onClose,
  name,
  children
}: ModalComponent)  {

  // Helper function to capitalize first letter
  // const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  // Define stat items for the character
  // const characterStats = [
  //   {
  //     icon: <Ruler className="text-lightsaber-blue" size={20} />,
  //     label: 'Height',
  //     value: `${character.height} cm`,
  //   },
  //   {
  //     icon: <Weight className="text-lightsaber-blue" size={20} />,
  //     label: 'Mass',
  //     value: `${character.mass} kg`,
  //   },
  //   {
  //     icon: <Calendar className="text-lightsaber-blue" size={20} />,
  //     label: 'Birth Year',
  //     value: character.birth_year,
  //   },
  //   {
  //     icon: <Eye className="text-lightsaber-blue" size={20} />,
  //     label: 'Eye Color',
  //     value: capitalize(character.eye_color),
  //   },
  //   {
  //     icon: <UserCircle className="text-lightsaber-blue" size={20} />,
  //     label: 'Gender',
  //     value: capitalize(character.gender),
  //   },
  //   {
  //     icon: <Palette className="text-lightsaber-blue" size={20} />,
  //     label: 'Hair Color',
  //     value: capitalize(character.hair_color),
  //   }
  // ];

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="2xl"
      classNames={{
        backdrop: "bg-[#000000]/50 backdrop-opacity-40",
        base: "border-[var(--lightsaber-blue)]",
        header: "border-b-[1px] border-[var(--lightsaber-blue)]",
        body: "py-6 max-h-[80vh] overflow-auto",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold">{name || ""}</h2>
        </ModalHeader>
        <ModalBody>
          {/* <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {characterStats.map((stat, index) => (
                <Card 
                  key={index}
                  className="border-[var(--lightsaber-blue)] border"
                >
                  <CardBody className="flex flex-row items-center gap-3">
                    {stat.icon}
                    <div>
                      <p className="text-sm">{stat.label}</p>
                      <p className="text-[var(--lightsaber-blue)] font-semibold">
                        {stat.value}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Physical Traits</h3>
              <div className="flex flex-wrap gap-2">
                <Chip 
                  color="primary" 
                  variant="bordered"
                >
                  Skin Color: {capitalize(character.skin_color)}
                </Chip>
                <Chip 
                  color="primary" 
                  variant="bordered"
                >
                  Hair Color: {capitalize(character.hair_color)}
                </Chip>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                color="primary"
                variant="ghost"
                onPress={onClose}
              >
                Close
              </Button>
            </div>
          </div> */}
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

